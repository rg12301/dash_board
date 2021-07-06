import React, { useReducer } from 'react';
import { BellIcon as BellIconOutline } from '@heroicons/react/outline';
import { BellIcon as BellIconSolid } from '@heroicons/react/solid';
import { UserCircleIcon as UserCircleOutline } from '@heroicons/react/outline';
import { UserCircleIcon as UserCircleSolid } from '@heroicons/react/solid';
import { ViewBoardsIcon as ViewBoardsIconOutline } from '@heroicons/react/outline';
import { ViewBoardsIcon as ViewBoardsIconSolid } from '@heroicons/react/solid';
import { ChartPieIcon as ChartPieIconOutline } from '@heroicons/react/outline';
import { ChartPieIcon as ChartPieIconSolid } from '@heroicons/react/solid';
import { ChatAlt2Icon as ChatAlt2IconOutline } from '@heroicons/react/outline';
import { ChatAlt2Icon as ChatAlt2IconSolid } from '@heroicons/react/solid';
import { DocumentReportIcon as DocumentReportIconOutline } from '@heroicons/react/outline';
import { DocumentReportIcon as DocumentReportIconSolid } from '@heroicons/react/solid';
import { SpeakerphoneIcon as SpeakerphoneIconOutline } from '@heroicons/react/outline';
import { SpeakerphoneIcon as SpeakerphoneIconSolid } from '@heroicons/react/solid';
import { TabBody } from './Sidepane';

interface Props {
    text: string;
    expanded: boolean;
    selected: boolean;
    onClick: () => void;
}

interface State {
    hover: boolean;
}

const stateReducer = (
    state: State,
    action: {
        type: 'MOUSE_ENTER' | 'MOUSE_EXIT';
    },
): State => {
    switch (action.type) {
        case 'MOUSE_ENTER':
            return { ...state, hover: true };
        case 'MOUSE_EXIT':
            return { ...state, hover: false };
        default:
            return state;
    }
};

const Tab = ({ text, expanded, selected, onClick }: Props) => {
    const [state, dispatchState] = useReducer(stateReducer, {
        hover: false,
    });

    const getOutlineIcon = () => {
        switch (text) {
            case 'Notifications':
                return <BellIconOutline />;
            case 'Members':
                return <UserCircleOutline />;
            case 'Articles':
                return <ViewBoardsIconOutline />;
            case 'Dashboard':
                return <ChartPieIconOutline />;
            case 'Feedback':
                return <ChatAlt2IconOutline />;
            case 'Reports':
                return <DocumentReportIconOutline />;
            case 'Adverts':
                return <SpeakerphoneIconOutline />;
            default:
                break;
        }
    };

    const getSolidIcon = () => {
        switch (text) {
            case 'Notifications':
                return <BellIconSolid />;
            case 'Members':
                return <UserCircleSolid />;
            case 'Articles':
                return <ViewBoardsIconSolid />;
            case 'Dashboard':
                return <ChartPieIconSolid />;
            case 'Feedback':
                return <ChatAlt2IconSolid />;
            case 'Reports':
                return <DocumentReportIconSolid />;
            case 'Adverts':
                return <SpeakerphoneIconSolid />;
            default:
                break;
        }
    };

    return (
        <div
            className={`px-10 py-6 flex flex-row items-center space-x-4 ${
                selected ? 'bg-white text-_blue rounded-l-2xl' : 'text-white'
            } text-lg font-semibold cursor-pointer group`}
            onMouseEnter={() => {
                dispatchState({ type: 'MOUSE_ENTER' });
            }}
            onMouseLeave={() => {
                dispatchState({ type: 'MOUSE_EXIT' });
            }}
            onClick={() => {
                onClick();
            }}>
            {state.hover ? (
                <div className='h-7 w-7 hidden group-hover:inline-block'>
                    {getSolidIcon()}
                </div>
            ) : selected ? (
                <div className='h-7 w-7 group-hover:inline-block'>
                    {getSolidIcon()}
                </div>
            ) : (
                <div className='h-7 w-7 group-hover:hidden font-extralight'>
                    {getOutlineIcon()}
                </div>
            )}
            {expanded && <span>{text}</span>}
        </div>
    );
};

export default Tab;
