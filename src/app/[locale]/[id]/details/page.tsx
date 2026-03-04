import Details from "src/components/Details";
import { getPostById, getPostComments } from "src/services/api";

type Props = {
	params: Promise<{ id: string }> | { id: string };
};

export default async function PostDetails({ params }: Props) {
	const { id } = await params;
	const comments = await getPostComments(id);
	const info = await getPostById(id);

	return <Details postId={id} postComments={comments} postInfo={info} />;
}
