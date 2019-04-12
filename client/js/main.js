new Vue({
    el: '#app',
    data: {
        solatTimes: '',
        city: '',
        imageUrlTwitter: '',
        imageUrl: ""
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
                .post('http://localhost:3000/jadwal', {
                    city: this.city
                })
                .then(({ data }) => {
                    console.log(data, 'dataaa')
                    solatTime = data.jadwal[0]
                    if (!solatTime) {
                        swal('input kota salah')
                    } else {
                        let str = `\nLokasi: ${data.kota}\nSubuh jam ${solatTime.fajr},\nDzuhur jam ${solatTime.dhuhr},\nAshar jam\n${solatTime.asr},\nMagrib jam ${solatTime.maghrib},\nIsya jam ${solatTime.isha}`
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
            html2canvas(document.getElementById('canvas')).then( (canvas) => {
                console.log(canvas.toDataURL('image/png'), '------')
                // if(document.getElementById('ss').chidren){
                //     document.getElementById('ss').removeChild(document.getElementById('ss').children[0])
                //     console.log(document.getElementById('ss').children,'aaa')
                // }
                document.getElementById('ss').appendChild(canvas);
                
                // console.log(document.getElementById('ss'))
                // document.getElementById('ss').replaceChild(canvas,document.getElementById('subss'))
                // document.getElementsByTagName('canvas').id = 'subss'
                // console.log(document.getElementsByTagName('canvas'))

                var base64URL = canvas.toDataURL('image/png')
                // .replace('image/png', 'image/octet-stream');
                axios.
                post('http://localhost:3000/upload',{
                    image: base64URL
                })
                .then((data) => {
                    console.log('masuk sini')
                    this.imageUrl = data.data
                    // this.imageUrlTwitter=`https://twitter.com/share?url=&text=${this.imageUrl}&via=[via]&hashtags=[hashtags]`
                    console.log(this.imageUrlTwitter)
                    // console.log(imageUrl,"++++++++++++++")
                    
                })
                .catch((err) => {
                    console.log(err)
                })
                console.log(base64URL)
            });
        }
    }
})