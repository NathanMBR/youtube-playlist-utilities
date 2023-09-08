import { HomePage } from "@/presentation/pages";
import { GITHUB_REPOSITORY_URL } from "@/main/vite/config";

export const makeHomePage = () => <HomePage githubRepositoryURL={GITHUB_REPOSITORY_URL} />;
