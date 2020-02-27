const vm = new Vue({
    el: "#app",
    data: {
        transactions: []
    },
    mounted() {
        db.collection('transactions').onSnapshot((querySnapshot) => {
            querySnapshot.forEach(element => {
                this.transactions.push(element.data());
            });
            console.log(this.transactions);
        })
    }
});