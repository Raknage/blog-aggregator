import { setUser, readConfig } from "src/config";

function main() {
    let user = "Toni"
    setUser(user)
    console.log(readConfig())
}

main();