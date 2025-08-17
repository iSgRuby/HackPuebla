export default async function getAllAlerts(email : string){
    const url = `http://localhost:3000/api/users/${email}/alerts`
    const response = await fetch(url)
    const data = await response.json()
    return data.user_logs.alerts
}