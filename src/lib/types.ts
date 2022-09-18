interface App {
	appid: string;
	name: string;
}
interface Server {
	id: number;
	name: string;
	login: string;
	install_dir: string;
}
export type { App, Server };
