import { Comment } from '../models/Comment.mjs';

const uploadComment = async (req, res) => {
    try {
        const comment_user = req.user;
        const comment_content = req.body.content;
        const comment_file_id = req.body.fileId;

        if (!comment_user || !comment_content || !comment_file_id) {
            return res.status(400).json({ message: 'Missing parameters in the request' });
        }

        const newComment = new Comment({
            content: comment_content,
            user: comment_user,
            file: comment_file_id
        })
        await newComment.save();

        return res.status(200).json({ comment: newComment });
    } catch (error) {
        console.error('Error during comment upload:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

const getAllComments = async (req, res) => {
    try {
        const userId = req.user._id;
        const fileId = req.body.fileId;

        const comments = await Comment.find({ file: fileId });

        return res.status(200).json({ comments: comments });
    } catch (error) {
        console.error('Error during fetching all comments:', error);
        return res.status(500).json({ message: 'Server error' });
    }

}

const deleteComment = async (req, res) => {
    try {
        const userId = req.user._id;
        const commentId = req.params.id;

        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error during deleting comment:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export { uploadComment, getAllComments, deleteComment }