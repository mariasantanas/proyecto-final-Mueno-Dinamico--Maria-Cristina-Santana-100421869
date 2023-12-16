//$("#qr").hide(); //Lo primero a suceder
//document.getElementById("qr").style.visibility="hidden";


window.onload = document.getElementById("qr");

var vcard = {
    str_start: 'BEGIN:VCARD\nVERSION:1.0\n',
    str_vcard: 'BEGIN:VCARD\nVERSION:1.0\n',
    str_end: '\nEND:VCARD',
    goog_chart: 'http://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=',
    form: [],
    get_field: function(field) {
        for (var i in vcard.form) {
            if (vcard.form[i].name === field) {
                return vcard.form[i].value.replace(/^\s+|\s+$/g, "");
            }
        }
    },
    add_personal_info: function() {
        let nombre = vcard.get_field("nombre"),
            apellido = vcard.get_field("apellido"),
            edad = vcard.get_field('edad'),
            genero = vcard.get_field('genero'),
            telefono = vcard.get_field('telefono'),
            email = vcard.get_field('email'),
            direccion = vcard.get_field('direccion');

        vcard.str_vcard += 'N:' + apellido + ';' + nombre + '\n' +
            'FN:' + nombre + ' ' + apellido;

        if (edad !== '') { vcard.str_vcard += '\nBDAY:' + edad; }

        if (genero !== '') { vcard.str_vcard += '\nX-GENDER:' + genero; }

        if (telefono !== '') { vcard.str_vcard += '\nTEL;TYPE=Informacion Personal:' + telefono; }

        if (email !== '') { vcard.str_vcard += '\nEMAIL;TYPE=internet,email:' + email; }

        if (direccion !== '') {
            vcard.str_vcard += '\nADR;TYPE=Informacion Personal:' + direccion;
        }

    },

    required_check: function() {
        var nombre = vcard.get_field("nombre"),
            apellido = vcard.get_field("apellido"),
            msg = 'Campo%CAMPO% %NOMBRE% %VERBO% requerido.',
            fields = [];

        if (nombre === '') { fields.push('Nombre'); }

        if (apellido === '') { fields.push('Apellido'); }

        if (fields.length === 0) { return ''; }

        msg = msg.replace('%NOMBRE%', fields.join(', '));

        msg = msg.replace('%CAMPO%', (fields.length === 1) ? '' : 's');

        msg = msg.replace('%VERBO%', (fields.length === 1) ? 'es' : 'son');

        return msg;
    },

    save: function() {
        vcard.form = $('form').serializeArray();

        var required_check_output = vcard.required_check();

        if (required_check_output !== '') {
            alert(required_check_output);
            return;
        }

        vcard.add_personal_info();

        vcard.str_vcard += vcard.str_end;

        $('textarea[name="vcard"]').val(vcard.str_vcard);

        $('#qr').attr('src', vcard.goog_chart + vcard.str_vcard.replace(/\n/g, '%0A'));

        $('#qr').show();

        vcard.str_vcard = vcard.str_start;
    }
};

$(function() {
    $('input[name="submit"]').click(vcard.save);
});

function hideImage() {
    location.reload(true);
    var img = document.getElementById('qr');
    img.style.visibility = 'hidden';

}