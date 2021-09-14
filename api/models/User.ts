export default interface User {
    preferred_username: string;
    sub: string;
    groups: string[];
    badgerId: string;
    azp: string; //sso key used to log in
    token: string;
}