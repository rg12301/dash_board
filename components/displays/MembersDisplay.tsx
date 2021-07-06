import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
    createStyles,
    lighten,
    makeStyles,
    Theme,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { MEMBER } from '../../utilities/types';
import useLoadingContext from '../../utilities/context/LoadingContext';
import Loading from '../Loading';
import {
    addMember,
    deleteMember,
    deleteMemberProfileImage,
    editMember,
    getMembers,
    uploadMemberProfileImage,
} from '../../utilities/controller/MemberController';
import useProjectContext from '../../utilities/context/ProjectContext';
import { v4 as uuidv4 } from 'uuid';
import { ArrowNarrowLeftIcon, UserCircleIcon } from '@heroicons/react/solid';
import useUserContext from '../../utilities/context/UserContext';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof MEMBER;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
    {
        id: 'uid',
        numeric: true,
        disablePadding: false,
        label: 'User ID',
    },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'phone', numeric: true, disablePadding: false, label: 'Phone' },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
    { id: 'college', numeric: false, disablePadding: false, label: 'College' },
    {
        id: 'current_profession',
        numeric: false,
        disablePadding: false,
        label: 'Current Profession',
    },
    {
        id: 'year_of_passing',
        numeric: true,
        disablePadding: false,
        label: 'Year of Passing',
    },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
];

interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    numSelected: number;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof MEMBER,
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    role: 'Admin' | 'Manager' | 'Developer';
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        role,
    } = props;
    const createSortHandler =
        (property: keyof MEMBER) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {role === 'Admin' && (
                    <TableCell padding='checkbox'>
                        <Checkbox
                            indeterminate={
                                numSelected > 0 && numSelected < rowCount
                            }
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{ 'aria-label': 'select all desserts' }}
                        />
                    </TableCell>
                )}

                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}>
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}>
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc'
                                        ? 'sorted descending'
                                        : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                      color: theme.palette.secondary.main,
                      backgroundColor: lighten(
                          theme.palette.secondary.light,
                          0.85,
                      ),
                  }
                : {
                      color: theme.palette.text.primary,
                      backgroundColor: theme.palette.secondary.dark,
                  },
        title: {
            flex: '1 1 100%',
        },
    }),
);

interface EnhancedTableToolbarProps {
    numSelected: number;
    setAdd: React.Dispatch<React.SetStateAction<boolean>>;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    handleDelete: () => void;
    role: 'Admin' | 'Manager' | 'Developer';
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const classes = useToolbarStyles();
    const { numSelected, setAdd, setEdit, handleDelete, role } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}>
            {numSelected > 0 ? (
                <Typography
                    className={classes.title}
                    color='inherit'
                    variant='subtitle1'
                    component='div'>
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    className={classes.title}
                    variant='h6'
                    id='tableTitle'
                    component='div'>
                    Members
                </Typography>
            )}
            {numSelected > 0 ? (
                <>
                    {numSelected === 1 &&
                        (role == 'Admin' || role == 'Manager') && (
                            <Tooltip title='Edit Member'>
                                <IconButton
                                    aria-label='edit'
                                    onClick={() => {
                                        setEdit(true);
                                    }}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                    {role == 'Admin' && (
                        <Tooltip title='Delete'>
                            <IconButton
                                aria-label='delete'
                                onClick={handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </>
            ) : (
                (role == 'Admin' || role == 'Manager') && (
                    <Tooltip title='Add Member'>
                        <IconButton
                            aria-label='add member'
                            onClick={() => {
                                setAdd(true);
                            }}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                )
            )}
        </Toolbar>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
    }),
);

export default function EnhancedTable() {
    const [rows, setRows] = useState<MEMBER[]>([]);
    const { loading, setLoading } = useLoadingContext();
    const { user } = useUserContext();
    const { initializedProject } = useProjectContext();
    const classes = useStyles();
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] =
        React.useState<keyof MEMBER>('year_of_passing');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const [add, setAdd] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [addSuccess, setAddSuccess] = useState<boolean>(false);
    const [editSuccess, setEditSuccess] = useState<boolean>(false);
    const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<File | undefined>();
    const [profileImageUrl, setProfileImageUrl] = useState<string>('');
    const [memberUid, setmemberUid] = useState<string>(uuidv4());
    const [uploading, setUploading] = useState<boolean>(false);
    const [updateMember, setUpdateMember] = useState<MEMBER | undefined>();

    useEffect(() => {
        getMembers(initializedProject!).then((members) => {
            setRows(members);
        });
    }, []);

    useEffect(() => {
        getMembers(initializedProject!).then((members) => {
            setRows(members);
            setLoading!(false);
            setDeleteSuccess(false);
        });
    }, [deleteSuccess]);

    useEffect(() => {
        if (addSuccess)
            getMembers(initializedProject!).then((members) => {
                setRows(members);
                setLoading!(false);
                setAddSuccess(false);
            });
        setProfileImage(undefined);
        setProfileImageUrl('');
        setmemberUid(uuidv4());
    }, [add]);

    useEffect(() => {
        if (editSuccess)
            getMembers(initializedProject!).then((members) => {
                setRows(members);
                setLoading!(false);
                setEditSuccess(false);
            });
        setProfileImage(undefined);
        setProfileImageUrl('');
    }, [edit]);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof MEMBER,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.uid);
            if (newSelecteds.length === 1) {
                setUpdateMember(
                    rows.find((row) => row.uid === newSelecteds[0]),
                );
            }
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);

        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        if (newSelected.length === 1) {
            setUpdateMember(rows.find((row) => row.uid === newSelected[0]));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const handleAddSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading!(true);
        const target = event.target as typeof event.target & {
            name: { value: string };
            phone: { value: number };
            gender: {
                value: 'Male' | 'Female' | 'Non-Binary' | 'Prefer not to say';
            };
            email: { value: string };
            college: { value: string };
            current_profession: { value: string };
            year_of_passing: { value: number };
            address: { value: string };
        };
        if (profileImage) {
            uploadMemberProfileImage(
                initializedProject!,
                profileImage,
                memberUid,
            ).then((url) => {
                if (!url) {
                    console.log(
                        `Member profile cannot be updated due to internal error!!`,
                    );
                }
                const member = {
                    uid: memberUid,
                    name: target.name.value,
                    phone: target.phone.value,
                    profile_image: url,
                    gender: target.gender.value,
                    email: target.email.value,
                    college: target.college.value,
                    current_profession: target.current_profession.value,
                    year_of_passing: target.year_of_passing.value,
                    address: target.address.value,
                };
                console.log(member);
                addMember(initializedProject!, member).then(() => {
                    setAddSuccess(true);
                    setAdd(false);
                });
            });
        } else {
            const member = {
                uid: memberUid,
                name: target.name.value,
                phone: target.phone.value,
                profile_image: '',
                gender: target.gender.value,
                email: target.email.value,
                college: target.college.value,
                current_profession: target.current_profession.value,
                year_of_passing: target.year_of_passing.value,
                address: target.address.value,
            };
            console.log(member);
            addMember(initializedProject!, member).then(() => {
                setAddSuccess(true);
                setAdd(false);
            });
        }
    };

    const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading!(true);
        const target = event.target as typeof event.target & {
            name: { value: string };
            phone: { value: number };
            gender: {
                value: 'Male' | 'Female' | 'Non-Binary' | 'Prefer not to say';
            };
            email: { value: string };
            college: { value: string };
            current_profession: { value: string };
            year_of_passing: { value: number };
            address: { value: string };
        };
        profileImage &&
            deleteMemberProfileImage(initializedProject!, updateMember!.uid);
        if (profileImage) {
            uploadMemberProfileImage(
                initializedProject!,
                profileImage,
                updateMember!.uid,
            ).then((url) => {
                if (!url) {
                    console.log(
                        `Member profile cannot be updated due to internal error!!`,
                    );
                }
                const updatedMember = {
                    uid: updateMember!.uid,
                    name: target.name.value,
                    phone: target.phone.value,
                    profile_image: url,
                    gender: target.gender.value,
                    email: target.email.value,
                    college: target.college.value,
                    current_profession: target.current_profession.value,
                    year_of_passing: target.year_of_passing.value,
                    address: target.address.value,
                };
                setUpdateMember(updatedMember);
                editMember(initializedProject!, updatedMember).then(() => {
                    setEditSuccess(true);
                    setEdit(false);
                });
            });
        } else {
            const updatedMember = {
                uid: updateMember!.uid,
                name: target.name.value,
                phone: target.phone.value,
                profile_image: '',
                gender: target.gender.value,
                email: target.email.value,
                college: target.college.value,
                current_profession: target.current_profession.value,
                year_of_passing: target.year_of_passing.value,
                address: target.address.value,
            };
            setUpdateMember(updatedMember);
            editMember(initializedProject!, updatedMember).then(() => {
                setEditSuccess(true);
                setEdit(false);
            });
        }
    };

    const handleDelete = () => {
        setLoading!(true);
        selected.forEach((selectedMember) => {
            deleteMember(initializedProject!, selectedMember);
        });
        setSelected([]);
        setDeleteSuccess(true);
    };
    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return loading ? (
        <Loading />
    ) : add ? (
        <section className='w-full h-full flex flex-col justify-start items-center px-3'>
            <form
                className='mt-10 px-5 md:px-9 lg:px-14 py-10 flex flex-col space-y-10 w-full md:w-2/3 border border-gray-300 rounded-xl'
                onSubmit={handleAddSubmit}>
                <div className='flex flex-col space-y-5 justify-center items-center'>
                    <div className='w-full'>
                        <ArrowNarrowLeftIcon
                            className='hover:text-_blue cursor-pointer w-7 h-7'
                            onClick={() => {
                                setAddSuccess(false);
                                setAdd(false);
                            }}
                        />
                    </div>
                    <h3 className='text-2xl font-semibold text-center'>
                        Add Member
                    </h3>
                    <div>
                        <input
                            type='file'
                            name='profile_image'
                            id='profile_image'
                            accept='image/*'
                            className='hidden'
                            onChange={(event) => {
                                setUploading(true);
                                if (event.target.files) {
                                    setProfileImage(event.target.files[0]);
                                    const url = URL.createObjectURL(
                                        event.target.files[0],
                                    );
                                    setProfileImageUrl(url);
                                }
                                setUploading(false);
                            }}
                        />
                        {uploading ? (
                            <div className='w-24 h-24'>
                                <Loading />
                            </div>
                        ) : (
                            <label
                                htmlFor='profile_image'
                                className='mx-auto my-auto cursor-pointer'>
                                {profileImageUrl ? (
                                    <div className='w-24 h-24 rounded-full overflow-hidden'>
                                        <img
                                            src={profileImageUrl}
                                            className='w-24 h-24 rounded-full object-cover'
                                        />
                                    </div>
                                ) : (
                                    <UserCircleIcon className=' w-24 h-24' />
                                )}
                            </label>
                        )}
                    </div>
                </div>
                <div className='w-full flex flex-row items-center space-x-5'>
                    <div className='w-full flex flex-col items-center space-y-5'>
                        <input
                            className='input'
                            type='text'
                            name='name'
                            placeholder='Name*'
                            required
                        />
                        <input
                            className='input'
                            type='tel'
                            name='phone'
                            placeholder='Phone* (10 digits)'
                            pattern='[0-9]{10}'
                            required
                        />
                        <select className='input' name='gender' required>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Non-Binary'>Non-Binary</option>
                            <option value='Prefer not to say'>
                                Prefer not to say
                            </option>
                        </select>
                        <input
                            className='input'
                            type='email'
                            name='email'
                            placeholder='Email*'
                            required
                        />
                    </div>
                    <div className='w-full flex flex-col items-center space-y-5'>
                        <input
                            className='input'
                            type='text'
                            name='college'
                            placeholder='College*'
                            required
                        />
                        <input
                            className='input'
                            type='text'
                            name='current_profession'
                            placeholder='Current Profession*'
                            required
                        />
                        <input
                            className='input'
                            type='number'
                            name='year_of_passing'
                            placeholder='Year of Passing*'
                            min={new Date().getFullYear() - 10}
                            max={new Date().getFullYear() - 1}
                            defaultValue={new Date().getFullYear() - 10}
                            required
                        />
                        <input
                            className='input'
                            type='text'
                            name='address'
                            placeholder='Address'
                        />
                    </div>
                </div>
                <div className='flex flex-col items-center space-y-3'>
                    <button className='btn px-5 py-3 w-full' type='submit'>
                        <AddIcon />
                    </button>
                </div>
            </form>
        </section>
    ) : edit ? (
        <section className='w-full h-full flex flex-col justify-start items-center px-3'>
            <form
                className='mt-10 px-5 md:px-9 lg:px-14 py-10 flex flex-col space-y-10 w-full md:w-2/3 border border-gray-300 rounded-xl'
                onSubmit={handleEditSubmit}>
                <div className='flex flex-col space-y-5 justify-center items-center'>
                    <div className='w-full'>
                        <ArrowNarrowLeftIcon
                            className='hover:text-_blue cursor-pointer w-7 h-7'
                            onClick={() => {
                                setEditSuccess(false);
                                setEdit(false);
                            }}
                        />
                    </div>
                    <h3 className='text-2xl font-semibold text-center'>
                        Edit Member
                    </h3>
                    <div>
                        <input
                            type='file'
                            name='profile_image'
                            id='profile_image'
                            accept='image/*'
                            className='hidden'
                            onChange={(event) => {
                                setUploading(true);
                                if (event.target.files) {
                                    setProfileImage(event.target.files[0]);
                                    const url = URL.createObjectURL(
                                        event.target.files[0],
                                    );
                                    setProfileImageUrl(url);
                                }
                                setUploading(false);
                            }}
                        />
                        {uploading ? (
                            <div className='w-24 h-24'>
                                <Loading />
                            </div>
                        ) : (
                            <label
                                htmlFor='profile_image'
                                className='mx-auto my-auto cursor-pointer'>
                                {profileImage ? (
                                    <div className='w-24 h-24 rounded-full overflow-hidden'>
                                        <img
                                            src={profileImageUrl}
                                            className='w-24 h-24 rounded-full object-cover'
                                        />
                                    </div>
                                ) : updateMember!.profile_image !== '' ? (
                                    <div className='w-24 h-24 rounded-full overflow-hidden'>
                                        <img
                                            src={updateMember!.profile_image}
                                            className='w-24 h-24 rounded-full object-cover'
                                        />
                                    </div>
                                ) : (
                                    <UserCircleIcon className=' w-24 h-24' />
                                )}
                            </label>
                        )}
                    </div>
                </div>
                <div className='w-full flex flex-row items-center space-x-5'>
                    <div className='w-full flex flex-col items-center space-y-5'>
                        <input
                            className='input'
                            type='text'
                            name='name'
                            defaultValue={updateMember?.name}
                            placeholder='Name*'
                            required
                        />
                        <input
                            className='input'
                            type='tel'
                            name='phone'
                            placeholder='Phone* (10 digits)'
                            defaultValue={updateMember?.phone}
                            pattern='[0-9]{10}'
                            required
                        />
                        <select
                            className='input'
                            name='gender'
                            defaultValue={updateMember?.gender}
                            required>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Non-Binary'>Non-Binary</option>
                            <option value='Prefer not to say'>
                                Prefer not to say
                            </option>
                        </select>
                        <input
                            className='input'
                            type='email'
                            name='email'
                            defaultValue={updateMember?.email}
                            placeholder='Email*'
                            required
                        />
                    </div>
                    <div className='w-full flex flex-col items-center space-y-5'>
                        <input
                            className='input'
                            type='text'
                            name='college'
                            defaultValue={updateMember?.college}
                            placeholder='College*'
                            required
                        />
                        <input
                            className='input'
                            type='text'
                            name='current_profession'
                            defaultValue={updateMember?.current_profession}
                            placeholder='Current Profession*'
                            required
                        />
                        <input
                            className='input'
                            type='number'
                            name='year_of_passing'
                            placeholder='Year of Passing*'
                            min={new Date().getFullYear() - 10}
                            max={new Date().getFullYear() - 1}
                            defaultValue={updateMember?.year_of_passing}
                            required
                        />
                        <input
                            className='input'
                            type='text'
                            name='address'
                            placeholder='Address'
                            defaultValue={updateMember?.address}
                        />
                    </div>
                </div>
                <div className='flex flex-col items-center space-y-3'>
                    <button className='btn px-5 py-3 w-full' type='submit'>
                        <EditIcon />
                    </button>
                </div>
            </form>
        </section>
    ) : (
        <section className='w-5/6  mx-auto mt-12'>
            {user && (
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <EnhancedTableToolbar
                            numSelected={selected.length}
                            setAdd={setAdd}
                            setEdit={setEdit}
                            handleDelete={handleDelete}
                            role={user.role}
                        />
                        <TableContainer>
                            <Table
                                className={classes.table}
                                aria-labelledby='tableTitle'
                                size={dense ? 'small' : 'medium'}
                                aria-label='enhanced table'>
                                <EnhancedTableHead
                                    classes={classes}
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={rows.length}
                                    role={user.role}
                                />
                                <TableBody>
                                    {stableSort(
                                        rows,
                                        getComparator(order, orderBy),
                                    )
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage,
                                        )
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(
                                                row.uid,
                                            );
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={(event) =>
                                                        handleClick(
                                                            event,
                                                            row.uid,
                                                        )
                                                    }
                                                    role='checkbox'
                                                    aria-checked={
                                                        isItemSelected
                                                    }
                                                    tabIndex={-1}
                                                    key={row.uid}
                                                    selected={isItemSelected}>
                                                    {user!.role !==
                                                        'Developer' && (
                                                        <TableCell padding='checkbox'>
                                                            <Checkbox
                                                                checked={
                                                                    isItemSelected
                                                                }
                                                                inputProps={{
                                                                    'aria-labelledby':
                                                                        labelId,
                                                                }}
                                                            />
                                                        </TableCell>
                                                    )}
                                                    <TableCell align='right'>
                                                        {row.uid}
                                                    </TableCell>
                                                    <TableCell
                                                        component='th'
                                                        id={labelId}
                                                        scope='row'
                                                        padding='none'>
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align='right'>
                                                        {row.phone}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.email}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.college}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.current_profession}
                                                    </TableCell>
                                                    <TableCell align='right'>
                                                        {row.year_of_passing}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.address}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height:
                                                    (dense ? 33 : 53) *
                                                    emptyRows,
                                            }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[8, 16, 32]}
                            component='div'
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={dense}
                                onChange={handleChangeDense}
                            />
                        }
                        label='Dense padding'
                    />
                </div>
            )}
        </section>
    );
}
