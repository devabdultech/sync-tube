import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const getSession = async (): Promise<any> => {
	const supabase = createClientComponentClient();
	const {
		data: { session }
	} = await supabase.auth.getSession();

	return session;
};
