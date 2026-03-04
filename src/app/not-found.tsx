import type { Metadata } from "next";
import NotFound from "src/components/NotFound";

export const metadata: Metadata = { title: `404 page not found!` };

export default function NotFoundPage() {
	return <NotFound />;
}
