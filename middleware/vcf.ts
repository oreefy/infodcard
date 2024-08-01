export default function Vcf(data: any) {
    const save: any = {
        name: data.name,
        phone: data.phone,
        link: data.link,
    };
    //data.phone ? save.phone = data.phone : null;
    var vcf = `BEGIN:VCARD
VERSION:3.0
FN;CHARSET=UTF-8:${save.name}
N;CHARSET=UTF-8:;${save.name};;;
TEL;TYPE=CELL:${save.phone}
URL;type=WORK;CHARSET=UTF-8:${process.env.NEXT_PUBLIC_APP_URL}/p/${save.link}
URL;CHARSET=UTF-8:
REV:${new Date}
END:VCARD`
    var blob = new Blob([vcf], { type: "text/vcard" });
    var url = URL.createObjectURL(blob);
    const newLink = document.createElement('a');
    newLink.download = `${save.name}-infodCard.vcf`;
    newLink.textContent = save.name;
    newLink.href = url;
    newLink.click();
}