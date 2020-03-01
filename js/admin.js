const vm = new Vue({
    el: "#app",
    data: {
        transactions: []
    },
    mounted() {
        db.collection('transactions').orderBy("createdAt").onSnapshot((snapshot) => {

            let changes = snapshot.docChanges();
            console.log(changes);
            changes.forEach(change => {
                if (change.type == "added") {
                    this.transactions.unshift(change.doc.data())
                }
            });
        })
    }
});