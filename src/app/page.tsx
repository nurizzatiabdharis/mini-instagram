import Dashboard from "src/components/Dashboard";

async function getData() {
	const res = await fetch(
		"https://mini-instagram-api.mistcloud.workers.dev/api/posts",
		{
			headers: {
				"x-api-key": "ivapikey123",
			},
			next: { revalidate: 60 },
		},
	);

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

export default async function Home() {
	const data = await getData();
	return <Dashboard initialData={data} />;
}
