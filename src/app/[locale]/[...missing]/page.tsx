import { notFound } from "next/navigation";
import NotFound from "src/components/NotFound";

export default function CatchAllNotFound() {
	notFound();
	return <NotFound />;
}
