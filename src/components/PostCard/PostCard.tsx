export const PostCard = ({ title, body }: { title: string; body: string }): JSX.Element => {
    return (
        <div>
            <h2>{title}</h2>
            <p>{body}</p>
        </div>
    );
}
