import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function RedirectToReception() {
	const router = useRouter();

	useEffect(() => {
		// Delay the navigation to ensure the root layout is mounted
		const timeoutId = setTimeout(() => {
			router.replace("/reception");
		}, 0);

		// Cleanup the timeout if the component unmounts
		return () => clearTimeout(timeoutId);
	}, [router]);

	return null; // This component doesn't render anything
}
