import Dashboard from "src/components/Dashboard";
import { getPostList } from "src/services/api";

export default async function Home() {
	const data = await getPostList();
	return <Dashboard initialData={data} />;
}
