new Vue({
    el: '#app',
    data: {
        solatTimes: '',
        city: ''
    },
    methods: {
        createPDF() {
            // let solatTime = "date_for: 2019-4-11,\nfajr: 4:33 am,\nshurooq: 5:44 am,\ndhuhr: 11:50 am,\nasr: 3:09 pm,\nmaghrib: 5:57 pm,\nisha: 6:59 pm"
            let pdfName = 'test';
            var doc = new jsPDF()
            doc.text(this.solatTimes, 10, 10);
            doc.save(pdfName + '.pdf');
        },
        getSolatTime() {
            axios
                .post('http://localhost:3000/users/solat', {
                    city: this.city
                })
                .then(({ data }) => {
                    console.log(data, 'dataaa')
                    solatTime = data.jadwal[0]
                    if (!solatTime) {
                        swal('input kota salah')
                    } else {
                        let str = `\nJadwal solat hari ini di: ${data.kota}\nSubuh jam ${solatTime.fajr},\nDzuhur jam ${solatTime.dhuhr},\nAshar jam\n${solatTime.asr},\nMagrib jam ${solatTime.maghrib},\nIsya jam ${solatTime.isha}`
                        this.solatTimes = str
                    }
                    console.log(solatTime)
                    console.log('siap')
                })
                .catch(err => {
                    console.log(err.message)
                })
        },
        screenshot() {
            html2canvas(document.getElementById('canvas')).then(function (canvas) {
                document.body.appendChild(canvas);

                var base64URL = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');

                console.log(base64URL)
            });
        }
    }
})