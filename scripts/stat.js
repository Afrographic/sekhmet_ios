class Stat{
    static async  groupPerDay(){
        await init_data();
        console.log(cashflows);
    }
}
Stat.groupPerDay();