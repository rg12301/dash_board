// Imports
import firebase, { COLLECTIONS } from '../firebase';
import { ARTICLE } from '../types';

// -----------------------------------------------------------------------------
/** Get provided number of articles (limit) to display
 * @param  {firebase.app.App} initializedProject
 * @returns Promise
 */
export async function getArticles(
    initializedProject: firebase.app.App,
): Promise<ARTICLE[]> {
    const articles: ARTICLE[] = [];
    await initializedProject
        .firestore()
        .collection(COLLECTIONS.ARTICLES)
        .get()
        .then((snapshot) => {
            if (!snapshot.empty) {
                snapshot.forEach((articleDoc) => {
                    articles.push(articleDoc.data() as ARTICLE);
                });
            }
        });
    return articles;
}

// -----------------------------------------------------------------------------
/**
 * Add a article to firestore database of initialized project.
 * @param  {firebase.app.App} initializedProject
 * @param  {ARTICLE} article
 * @returns Promise
 */
export async function addArticle(
    initializedProject: firebase.app.App,
    article: ARTICLE,
): Promise<void> {
    return await initializedProject
        .firestore()
        .collection(COLLECTIONS.ARTICLES)
        .doc(article.article_id)
        .set(article)
        .then(() => {
            console.log('Article added successfully');
        })
        .catch((error) => {
            console.error('Cannont add article, error occurred!', error);
        });
}

// -----------------------------------------------------------------------------
export async function uploadArticleBannerImage(
    initializedProject: firebase.app.App,
    file: File | null | undefined,
    article_id: string,
): Promise<string> {
    return await initializedProject
        .storage()
        .ref(`ARTICLES/${article_id}/bannerImage`)
        .put(file as Blob)
        .then((snapshot) => {
            console.log('Banner image uploaded successfully');
            return snapshot.ref.getDownloadURL();
        })
        .catch((error) => {
            console.error(
                'Error occured while uploading the banner image!',
                error,
            );
            return '';
        });
}

// -----------------------------------------------------------------------------
export async function deleteArticleBannerImage(
    initializedProject: firebase.app.App,
    article_id: string,
) {
    return await initializedProject
        .storage()
        .ref(`ARTICLES/${article_id}/bannerImage`)
        .delete()
        .then(() => {
            console.log('Banner image deleted successfully');
        })
        .catch((error) => {
            console.error(
                'Cannot delete banner image, an error occurred!',
                error,
            );
        });
}

// -----------------------------------------------------------------------------
export async function editArticle(
    initializedProject: firebase.app.App,
    updatedArticle: ARTICLE,
): Promise<void> {
    return await initializedProject
        .firestore()
        .collection(COLLECTIONS.ARTICLES)
        .doc(updatedArticle.article_id)
        .update(updatedArticle)
        .then(() => {
            console.log('Article updated successfully');
        })
        .catch((error) => {
            console.error('Cannont update article, error occurred!', error);
        });
}

// -----------------------------------------------------------------------------
export async function deleteArticle(
    initializedProject: firebase.app.App,
    article_id: string,
) {
    await initializedProject
        .firestore()
        .collection(COLLECTIONS.ARTICLES)
        .doc(article_id)
        .delete()
        .then(() => {
            console.log('Article deleted successfully');
        })
        .catch((error) => {
            console.error('Cannot delete article, an error occurred!', error);
        });
}
