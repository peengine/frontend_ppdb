export function formatRupiah(angka){
    return new Intl.NumberFormat("id-ID",{
        style:"currency",
        currency:"IDR"
    }).format(angka)
}

export function formatTanggal(tgl){
    const d = new Date(tgl);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const result = day+"-"+month+"-"+year
    return result
}
export function getStatus(status){
    if(status === '0'){
        return ( <span className="badge bg-warning">Pending</span> )
    }
    if(status === '1'){
        return ( <span className="badge bg-success">Sukses</span> )
    }
    if(status === '2'){
        return ( <span className="badge bg-warning">Gagal</span> )
    }
}
export async function inputNumOnly(event){
    return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))
}
