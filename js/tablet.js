let a_pro = {

    product_code: 0,
    // 商品名
    name: '',
    // 価格(単価)
    price: 0,

    // 在庫数
    stock: 0,

    // 最大在庫数
    maxstock: 0,

    // 販売状況
    sale_status: 1,

    // 更新日
    update_date: ""
}

let b_pro = {
    product_code: 0,

    // 商品名
    name: '',
    // 価格(単価)
    price: 0,

    // 在庫数
    stock: 0,

    // 最大在庫数
    maxstock: 0,

    // 販売状況
    sale_status: 1,

    // 更新日
    update_date: ""
}

let c_pro = {
    product_code: 0,

    // 商品名
    name: '',
    // 価格(単価)
    price: 0,

    // 在庫数
    stock: 0,

    // 最大在庫数
    maxstock: 0,

    // 販売状況
    sale_status: 1,

    // 更新日
    update_date: ""
}

let d_pro = {
    product_code: 0,

    // 商品名
    name: '',
    // 価格(単価)
    price: 0,

    // 在庫数
    stock: 0,

    // 最大在庫数
    maxstock: 0,

    // 販売状況
    sale_status: 1,

    // 更新日
    update_date: ""
}

// load時処理
$(function() {

    // ms_productデータ取得
    get_ms_product();

    // (仮) オーダー情報取得 5秒
    // setInterval(get_dt_order_header, 5000);

    get_dt_order_header();

    // オープンチェック後 open_shop()
    open_check();

})

// オープン判定
const open_check = () => {
    $.ajax({
            type: "get", //HTTP通信の種類
            url: 'tablet/open', //通信したいURL
            dataType: 'json'
        })
        //通信が成功したとき
        .done((res) => {
            if (res.length == 0) {
                console.log("まだopenしてませんよ");
                open_store();
            } else {
                console.log("もうopenしてますよ");
            }

        })
        //通信が失敗したとき
        .fail((error) => {
            console.log(error.statusText)
        })
}

// ms_productデータ取得
const get_ms_product = () => {

    // console.log("--ms_product-- get start");

    $.ajax({
            type: "get", //HTTP通信の種類
            url: 'tablet/getdata', //通信したいURL
            // dataType: 'json'
        })
        //通信が成功したとき
        .done((res) => {

            a_pro.product_code = res[0].product_code;
            a_pro.name = res[0].product_name;
            a_pro.price = res[0].unit_price;
            a_pro.stock = res[0].stock;
            a_pro.maxstock = res[0].maxstock;
            a_pro.sale_status = res[0].sale_status;
            a_pro.update_date = res[0].update_date;

            b_pro.product_code = res[1].product_code;
            b_pro.name = res[1].product_name;
            b_pro.price = res[1].unit_price;
            b_pro.stock = res[1].stock;
            b_pro.maxstock = res[1].maxstock;
            b_pro.sale_status = res[1].sale_status;
            b_pro.update_date = res[1].update_date;

            c_pro.product_code = res[2].product_code;
            c_pro.name = res[2].product_name;
            c_pro.price = res[2].unit_price;
            c_pro.stock = res[2].stock;
            c_pro.maxstock = res[2].maxstock;
            c_pro.sale_status = res[2].sale_status;
            c_pro.update_date = res[2].update_date;

            d_pro.product_code = res[3].product_code;
            d_pro.name = res[3].product_name;
            d_pro.price = res[3].unit_price;
            d_pro.stock = res[3].stock;
            d_pro.maxstock = res[3].maxstock;
            d_pro.sale_status = res[3].sale_status;
            d_pro.update_date = res[3].update_date;
        })
        //通信が失敗したとき
        .fail((error) => {
            console.log(error.statusText);
        })
}

// ms_product各個数 更新
// zaiko_close()から連想配列を受け取る
const put_ms_product = (lot, status) => {

    console.log("--ms_product-- put start");

    let data = {

        // 各商品コード
        a_product_code: a_pro.product_code,
        b_product_code: b_pro.product_code,
        c_product_code: c_pro.product_code,
        d_product_code: d_pro.product_code,

        // 各個数
        alot: lot.a_lot,
        blot: lot.b_lot,
        clot: lot.c_lot,
        dlot: lot.d_lot,

        // 各販売状況
        a_sale: status.a_status,
        b_sale: status.b_status,
        c_sale: status.c_status,
        d_sale: status.d_status,
    }

    $.ajax({
            //POST通信

            type: "POST",
            url: "tablet/putdata",
            data: JSON.stringify(data),
            contentType: 'application/json',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            }
        })
        //通信が成功したとき
        .then((res) => {
            console.log(res);
        })
        //通信が失敗したとき
        .fail((error) => {
            console.log(error.statusText);
        });
}

// :dt_open(open_dt, key)追加 
const post_dt_open = () => {
    $.ajax({
            //POST通信
            type: "POST",
            url: "tablet/postdt_open",

            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            }
        })
        //通信が成功したとき
        .then((res) => {
            console.log(res);
        })
        //通信が失敗したとき
        .fail((error) => {
            console.log(error.statusText);
        });
}

// 開店
const open_store = (event) => {
    let html = '';
    html += '<div id ="open_store">';
    html += '   <div class = "d-flex w-100 mb-4">';
    html += '       <div class="" style="margin-top: auto; margin-bottom: auto; font-size:150%;">閉店中 - 在庫調整 -</div>';
    html += '  </div>';
    html += '   <div class = "d-flex w-100" style="height:200px;">';
    html += '       <div class="border border-dark   ml-3 " style ="width:25%;" >'
    html += '           <div class="mt-5 mb-2" style="font-size:140%;">' + a_pro.name + '</div>'
    html += '           <div class="d-flex " >'
    html += '               <button class="btn btn-danger border border-dark zaiko_button"  onClick= zaiko_minus("oa");>-</button>';
    html += '               <div style="margin:auto; font-size:140%;"> <span id ="zaiko_oalot">' + a_pro.stock + '</span> 個</span> </div>';
    html += '               <button class="btn btn-primary border border-dark zaiko_button" onClick= zaiko_plus("oa");>+</button>';
    html += '           </div>';
    html += '       </div>';
    html += '       <div class="border border-dark   ml-3 " style ="width:25%;" >'
    html += '           <div class="mt-5 mb-2" style="font-size:140%;">' + b_pro.name + '</div>'
    html += '           <div class="d-flex " >'
    html += '               <button class="btn btn-danger border border-dark zaiko_button"  onClick= zaiko_minus("ob");>-</button>';
    html += '               <div style="margin:auto; font-size:140%;"> <span id ="zaiko_oblot"> ' + b_pro.stock + ' </span> 個</span> </div>';
    html += '               <button class="btn btn-primary border border-dark zaiko_button" onClick= zaiko_plus("ob");>+</button>';
    html += '           </div>';
    html += '       </div>';
    html += '       <div class="border border-dark   ml-3 " style ="width:25%;" >'
    html += '           <div class="mt-5 mb-2" style="font-size:140%;">' + c_pro.name + ' </div>'
    html += '           <div class="d-flex " >'
    html += '               <button class="btn btn-danger border border-dark zaiko_button"  onClick= zaiko_minus("oc");>-</button>';
    html += '               <div style="margin:auto; font-size:140%;"> <span id ="zaiko_oclot">' + c_pro.stock + ' </span> 個</span> </div>';
    html += '               <button class="btn  btn-primary border border-dark zaiko_button"  onClick= zaiko_plus("oc");>+</button>';
    html += '           </div>';
    html += '       </div>';
    html += '       <div class="border border-dark   ml-3 " style ="width:25%;" >'
    html += '           <div class="mt-5 mb-2" style="font-size:140%;">' + d_pro.name + '</div>'
    html += '           <div class="d-flex " >'
    html += '               <button class="btn btn-danger btn-primary border border-dark zaiko_button"  onClick= zaiko_minus("od");>-</button>';
    html += '               <div style="margin:auto; font-size:140%;"> <span id ="zaiko_odlot">' + d_pro.stock + ' </span> 個</span> </div>';
    html += '               <button class="btn btn-primary borderborder-dark zaiko_button"  onClick= zaiko_plus("od");>+</button>';
    html += '           </div>';
    html += '       </div>';
    html += '   </div>';
    html += '           <div class="d-flex " >'

    // 販売状況チェック
    const sale_status_html = (sale_status, button_id, sale_status_name, ) => {

        if (sale_status == 1) {
            // 販売中
            html += '    <button id = "' + button_id + '" data-sale = "' + sale_status + '" class="btn  btn-info border border-dark ml-3 mt-3"  style=" margin:auto; width:25%; font-size:140%;" onClick= sale_or_out("' + sale_status_name + '");>販売中</button>';

        } else if (sale_status == 2) {
            // 売り切れ
            html += '<button id = "' + button_id + '" data-sale = "' + sale_status + '" class="btn  btn-danger border border-dark ml-3 mt-3"  style=" margin:auto; width:25%; font-size:140%;" onClick= sale_or_out("' + sale_status_name + '");>売り切れ</button>';

        } else if (sale_status == 3) {
            // 販売休止中
            html += '<button id = "' + button_id + '" data-sale = "' + sale_status + '" class="btn  btn-secondary border border-dark ml-3 mt-3"  style=" margin:auto; width:25%; font-size:140%;" onClick= sale_or_out("' + sale_status_name + '");>販売休止中</button>';
        } else {

        }
    }

    sale_status_html(a_pro.sale_status, 'oa_sale', 'oa');
    sale_status_html(b_pro.sale_status, 'ob_sale', 'ob');
    sale_status_html(c_pro.sale_status, 'oc_sale', 'oc');
    sale_status_html(d_pro.sale_status, 'od_sale', 'od');

    html += '           </div>';
    html += '   <div class = "w-100 text-right mt-4" >';
    html += '       <button class="btn btn-success border border-dark " style="width: 120px; height:70px; font-size:140%" onClick= zaiko_close("open_shop");>開店</button>';
    html += '  </div>';
    html += '';
    html += '';
    html += '';
    html += '';
    html += '';
    html += '</div>';
    Swal
        .fire({
            // icon: 'question',
            // title: 'ログアウト確認',
            html: html,
            customClass: 'swal-wide',
            showConfirmButton: false,
            allowOutsideClick: false //枠外クリックは許可しない
                // showCancelButton: true,
                // confirmButtonText: 'はい',
                // confirmButtonColor: '#3085D6',
                // cancelButtonText: 'いいえ',
                // cancelButtonColor: '#d33',
        })
        .then((result) => {
            // どっちが押されたか
            if (result.isConfirmed) {
                // はい押下
                Swal.fire('( 仮 )', 'ログアウトしました', 'success');
            } else {
                // いいえ押下
                // Swal.fire( '(仮)', 'ログアウトを<BR>キャンセルしました', 'info' );
            }
        });
};

// 開店中 在庫調整を押下
const click_zaiko = () => {

    get_ms_product();

    let html = '';
    html += '<div>';
    html += '   <div class = "d-flex w-100 mb-4">';
    html += '       <div  class="" style="margin-top: auto; margin-bottom: auto; font-size:150%;">開店中 - 在庫調整 -</div>';
    html += '       <button id=zaiko_cancel" class="btn btn-light border border-dark"  style="width: 50px; height:50px; margin-left: auto; color:red;" onClick= zaiko_close("X");>X</button>';
    html += '  </div>';
    html += '   <div class = "d-flex w-100" style="height:200px;">';
    html += '       <div class="border border-dark   ml-3 " style ="width:25%;" >'
    html += '           <div class="mt-5 mb-2" style="font-size:140%;">' + a_pro.name + '</div>'
    html += '           <div class="d-flex " >'
    html += '               <button class="btn btn-danger border border-dark zaiko_button"  onClick= zaiko_minus("a");>-</button>';
    html += '               <div style="margin:auto; font-size:140%;"> <span id ="zaiko_alot">' + a_pro.stock + '</span> 個</span> </div>';
    html += '               <button class="btn btn-primary border border-dark zaiko_button" onClick= zaiko_plus("a");>+</button>';
    html += '           </div>';
    html += '       </div>';
    html += '       <div class="border border-dark   ml-3 " style ="width:25%;" >'
    html += '           <div class="mt-5 mb-2" style="font-size:140%;">' + b_pro.name + '</div>'
    html += '           <div class="d-flex " >'
    html += '               <button class="btn btn-danger border border-dark zaiko_button"  onClick= zaiko_minus("b");>-</button>';
    html += '               <div style="margin:auto; font-size:140%;"> <span id ="zaiko_blot"> ' + b_pro.stock + ' </span> 個</span> </div>';
    html += '               <button class="btn btn-primary border border-dark zaiko_button" onClick= zaiko_plus("b");>+</button>';
    html += '           </div>';
    html += '       </div>';
    html += '       <div class="border border-dark   ml-3 " style ="width:25%;" >'
    html += '           <div class="mt-5 mb-2" style="font-size:140%;">' + c_pro.name + '</div>'
    html += '           <div class="d-flex " >'
    html += '               <button class="btn btn-danger border border-dark zaiko_button"  onClick= zaiko_minus("c");>-</button>';
    html += '               <div style="margin:auto; font-size:140%;"> <span id ="zaiko_clot">' + c_pro.stock + ' </span> 個</span> </div>';
    html += '               <button class="btn  btn-primary border border-dark zaiko_button"  onClick= zaiko_plus("c");>+</button>';
    html += '           </div>';
    html += '       </div>';
    html += '       <div class="border border-dark   ml-3 " style ="width:25%;" >'
    html += '           <div class="mt-5 mb-2" style="font-size:140%;"> ' + d_pro.name + '</div>'
    html += '           <div class="d-flex " >'
    html += '               <button class="btn btn-danger btn-primary border border-dark zaiko_button"  onClick= zaiko_minus("d");>-</button>';
    html += '               <div style="margin:auto; font-size:140%;"> <span id ="zaiko_dlot">' + d_pro.stock + ' </span> 個</span> </div>';
    html += '               <button class="btn btn-primary borderborder-dark zaiko_button"  onClick= zaiko_plus("d");>+</button>';
    html += '           </div>';
    html += '       </div>';
    html += '   </div>';
    html += '           <div class="d-flex " >'


    // 販売状況チェック
    const sale_status_html = (sale_status, button_id, sale_status_name, ) => {

        if (sale_status == 1) {
            // 販売中
            html += '    <button id = "' + button_id + '" data-sale = "' + sale_status + '" class="btn  btn-info border border-dark ml-3 mt-3"  style=" margin:auto; width:25%; font-size:140%;" onClick= sale_or_out("' + sale_status_name + '");>販売中</button>';

        } else if (sale_status == 2) {
            // 売り切れ
            html += '<button id = "' + button_id + '" data-sale = "' + sale_status + '" class="btn  btn-danger border border-dark ml-3 mt-3"  style=" margin:auto; width:25%; font-size:140%;" onClick= sale_or_out("' + sale_status_name + '");>売り切れ</button>';

        } else if (sale_status == 3) {
            // 販売休止中
            html += '<button id = "' + button_id + '" data-sale = "' + sale_status + '" class="btn  btn-secondary border border-dark ml-3 mt-3"  style=" margin:auto; width:25%; font-size:140%;" onClick= sale_or_out("' + sale_status_name + '");>販売休止中</button>';
        } else {

        }
    }

    sale_status_html(a_pro.sale_status, 'a_sale', 'a');
    sale_status_html(b_pro.sale_status, 'b_sale', 'b');
    sale_status_html(c_pro.sale_status, 'c_sale', 'c');
    sale_status_html(d_pro.sale_status, 'd_sale', 'd');

    html += '           </div>';
    html += '   <div class = "w-100 text-right mt-4" >';
    html += '       <button class="btn btn-success border border-dark " style="width: 120px; height:70px; font-size:140%" onClick= zaiko_close("kakutei");>確定</button>';
    html += '  </div>';
    html += '';
    html += '';
    html += '';
    html += '';
    html += '';
    html += '</div>';
    Swal
        .fire({
            // icon: 'question',
            // title: 'ログアウト確認',
            html: html,
            customClass: 'swal-wide',
            showConfirmButton: false,
            // showCancelButton: true,
            // confirmButtonText: 'はい',
            // confirmButtonColor: '#3085D6',
            // cancelButtonText: 'いいえ',
            // cancelButtonColor: '#d33',
        })
        .then((result) => {
            // どっちが押されたか
            if (result.isConfirmed) {
                // はい押下
                Swal.fire('( 仮 )', 'ログアウトしました', 'success');
            } else {
                // いいえ押下
                // Swal.fire( '(仮)', 'ログアウトを<BR>キャンセルしました', 'info' );
            }
        });
}

// 在庫調整クローズ
const zaiko_close = (btn) => {

    // 開店
    if (btn == 'open_shop') {

        let a_sale = $('#oa_sale').data('sale');
        let b_sale = $('#ob_sale').data('sale');
        let c_sale = $('#oc_sale').data('sale');
        let d_sale = $('#od_sale').data('sale');

        // 開店 : 各商品販売状況
        let open_sale_status = {
            a_status: a_sale,
            b_status: b_sale,
            c_status: c_sale,
            d_status: d_sale
        }

        let alot = $('#zaiko_oalot').text()
        let blot = $('#zaiko_oblot').text()
        let clot = $('#zaiko_oclot').text()
        let dlot = $('#zaiko_odlot').text()

        // 開店 : 各個数
        let open_lot = {
            a_lot: alot,
            b_lot: blot,
            c_lot: clot,
            d_lot: dlot,
        }

        //  開店の各個数 headerに反映
        $('#alot').text(open_lot.a_lot);
        $('#blot').text(open_lot.b_lot);
        $('#clot').text(open_lot.c_lot);
        $('#dlot').text(open_lot.d_lot);

        post_dt_open();
        put_ms_product(open_lot, open_sale_status);

    } else if (btn == 'kakutei') {

        let a_sale = $('#a_sale').data('sale');
        let b_sale = $('#b_sale').data('sale');
        let c_sale = $('#c_sale').data('sale');
        let d_sale = $('#d_sale').data('sale');

        // 開店 : 各商品販売状況
        let sale_status = {
            a_status: a_sale,
            b_status: b_sale,
            c_status: c_sale,
            d_status: d_sale
        }

        let alot = $('#zaiko_alot').text()
        let blot = $('#zaiko_blot').text()
        let clot = $('#zaiko_clot').text()
        let dlot = $('#zaiko_dlot').text()

        // 開店 : 各個数
        let lot = {
            a_lot: alot,
            b_lot: blot,
            c_lot: clot,
            d_lot: dlot,
        }

        //  開店中の各個数 headerに反映
        $('#alot').text(lot.a_lot);
        $('#blot').text(lot.b_lot);
        $('#clot').text(lot.c_lot);
        $('#dlot').text(lot.d_lot);

        // post_dt_open();
        put_ms_product(lot, sale_status);



        //はい (オーダーキャンセルボタン内部) 押下
    } else if (btn == 'order_cancel') {
        // 該当の注文情報を下部移動させる
        // キャンセルであることを分かるように

        // オーダーキャンセル画面に表示されているオーダー番号
        let cancel_order_number = $('#cancel_order_number').text();

        //オーダーキャンセルするsection 
        let cancel_sec = document.getElementById('s' + cancel_order_number);
        // 位置移動
        $('#finish').prepend(cancel_sec);

        // (オーダー全体)
        // 精算済みとの差別化は…？色変える…？
        let cancel_o = '#o' + cancel_order_number;

        $(cancel_o).removeClass('bg-white');
        // $(cancel_o).addClass('bg-warning');
        $(cancel_o).addClass('bg-secondary');

        // キャンセルするオーダーの各ボタンの無効化
        // (調理開始)
        let cancel_c = '#c' + cancel_order_number;
        $(cancel_c).removeClass('btn-warning');
        $(cancel_c).addClass('disabled pointer');
        // $(cancel_c).addClass('text-danger');
        $(cancel_c).text('取り消し');

        // (完成 初期はdisabled)
        let cancel_k = '#k' + cancel_order_number;

        // 経過時間 変更
        $('#ln' + cancel_order_number).text('');
        $('#l' + cancel_order_number).text('');
        $('#lm' + cancel_order_number).text('');

        $(cancel_k).text('取り消し');

        // 初期状態 キャンセル
        if ($(cancel_k).hasClass('btn-info')) {

            $(cancel_k).removeClass('btn-info');

        } else if ($(cancel_k).hasClass('btn-success')) {

            $(cancel_k).removeClass('btn-success');

        } else {

            $(cancel_k).removeClass('btn-light');
        }

        $(cancel_k).addClass('disabled pointer');


        let cancel_ol = '#ol' + cancel_order_number;
        $(cancel_ol).addClass('disabled pointer textdecoration_linethrough');

        // 注文番号ラベルの色無効化

        if ($(cancel_ol).hasClass('bg-success')) {

            $(cancel_ol).removeClass('bg-success');

        }

    }
    swal.close();
};

// ＋ボタン
const zaiko_plus = (btn) => {

    let btn_plus = $('#zaiko_' + btn + 'lot').text();
    btn_plus = (btn_plus - 0) + 1;
    $('#zaiko_' + btn + 'lot').text('' + btn_plus);

};

// -ボタン
const zaiko_minus = (btn) => {

    let btn_minus = $('#zaiko_' + btn + 'lot').text();
    btn_minus = (btn_minus - 0) - 1;
    $('#zaiko_' + btn + 'lot').text('' + btn_minus);

};

// 販売中 中止ボタン
const sale_or_out = (btn) => {

    // 押下した販売状況btnのdata-sale を取得
    let sale_status = $('#' + btn + '_sale').data('sale');

    // 販売中 押下
    if (sale_status == 1) {

        // 売り切れ状態
        $('#' + btn + '_sale').text('売り切れ');
        $('#' + btn + '_sale').removeClass('btn-info');
        $('#' + btn + '_sale').addClass('btn-danger');

        $('#' + btn + '_sale').data('sale', 2);

    }
    // 売り切れ押下
    else if (sale_status == 2) {

        // 販売休止状態
        $('#' + btn + '_sale').text('販売休止中');
        $('#' + btn + '_sale').removeClass('btn-danger');
        $('#' + btn + '_sale').addClass('btn-secondary');

        $('#' + btn + '_sale').data('sale', 3);


        // 販売休止中押下
    } else if (sale_status == 3) {

        // 販売中
        $('#' + btn + '_sale').text('販売中');
        $('#' + btn + '_sale').removeClass('btn-secondary');
        $('#' + btn + '_sale').addClass('btn-info');

        $('#' + btn + '_sale').data('sale', 1);
    }
}

//  ---------------------ここから下 オーダー関係--------------

const get_dt_order_header = () => {

    let order = {
        order_dt: '',
        order_id: 1,
        order_status: 1,
        order_tm: 1,
        total_amount: 0,
        a_quantity: 1,
        b_quantity: 1,
        c_quantity: 1,
        d_quantity: 1
    }

    console.log('--get_dt_order_header--stt');
    $.ajax({
            type: "get", //HTTP通信の種類
            url: 'tablet/dt_order_header', //通信したいURL
            dataType: 'json'
        })
        //通信が成功したとき
        .done((res) => {
            console.log(res);
            for (let i = 0; i < res.length; i++) {

                let today_t_price_num = $('#today_t_price_num').text() - 0;
                console.log("today_t_price_num:" + today_t_price_num);

                order.order_dt = res[i].order_dt;
                order.order_id = res[i].order_id;
                order.order_status = res[i].order_status;
                order.order_tm = res[i].order_tm;
                order.total_amount = res[i].total_amount;
                order.a_quantity = res[i].a_quantity;
                order.b_quantity = res[i].b_quantity;
                order.c_quantity = res[i].c_quantity;
                order.d_quantity = res[i].d_quantity;

                // 精算済み
                if (order.order_status == 4) {
                    today_t_price_num += order.total_amount;
                    console.log("today_t_price_num:" + today_t_price_num);

                    $('#today_t_price_num').text(today_t_price_num);
                    $('#today_t_price').text(today_t_price_num.toLocaleString());
                }

                add_order(order);
            }
        })
        //通信が失敗したとき
        .fail((error) => {
            console.log(error.statusText);
        })
}

const close_shop = () => {

    location.reload();

}

// 在庫調整ボタン 押下時        
let btn_zaiko = document.getElementById('btn_zaiko');
btn_zaiko.onclick = (e) => {
    click_zaiko(e);
};

const get_random = () => {
    const MIN = 0;
    const MAX = 5;
    return (Math.floor(Math.random() * (MAX + 1 - MIN)) + MIN) - 0;
};

// 調理ボタン押下時
const click_cook = (order_no, order_status) => {

    // console.log("order" + order_no);
    // オーダーの各個数 
    let sub_alot = $('#a_' + order_no).text() - 0;
    let sub_blot = $('#b_' + order_no).text() - 0;
    let sub_clot = $('#c_' + order_no).text() - 0;
    let sub_dlot = $('#d_' + order_no).text() - 0;

    // headerの各個数
    let now_alot = $('#' + 'alot').text() - 0;
    let now_blot = $('#' + 'blot').text() - 0;
    let now_clot = $('#' + 'clot').text() - 0;
    let now_dlot = $('#' + 'dlot').text() - 0;

    // 更新される各個数
    let update_alot = now_alot - sub_alot;
    let update_blot = now_blot - sub_blot;
    let update_clot = now_clot - sub_clot;
    let update_dlot = now_dlot - sub_dlot;

    // 各個数更新
    $('#' + 'alot').text('' + update_alot);
    $('#' + 'blot').text('' + update_blot);
    $('#' + 'clot').text('' + update_clot);
    $('#' + 'dlot').text('' + update_dlot);

    // 調理ボタン状態変更
    // 調理開始 -> 調理中
    $('#c' + order_no).text('調理中');
    $('#c' + order_no).removeClass('btn-warning');
    $('#c' + order_no).removeClass('btn-light');
    $('#c' + order_no).addClass('disabled pointer');

    // 完成ボタンの状態
    $('#k' + order_no).removeClass('disabled pointer');
    $('#k' + order_no).removeClass('btn-light');
    $('#k' + order_no).addClass('btn-info');

    // 注文キャンセルボタン(注文番号ラベルの色)
    $('#ol' + order_no).removeClass('bg-success');


    let data = {
        order_id: order_no,
        order_status: 1,
        alot: update_alot,
        blot: update_blot,
        clot: update_clot,
        dlot: update_dlot,
    }

    put_order_status(data);

    $('#o' + order_no).data('status', 1);

    console.log($('#o' + order_no).data('status'));

}


const click_kansei = (order_no) => {

    let order_status = $('#o' + order_no).data('status') - 0;

    console.log("order_status:" + order_status);

    switch (order_status) {
        // 完成押下
        case 1:

            let kansei_cancel_flg = $('#k' + order_no).data('cancelflg');

            console.log("kansei_cancel_flg:" + kansei_cancel_flg);

            if (kansei_cancel_flg == 1) {
                console.log("キャンセルモード下です");
                console.log("キャンセルします");
                $('#k' + order_no).text('完成');
                $('#k' + order_no).data('cancelflg', 2);
                // clearInterval(intervalId); //intervalIdをclearIntervalで指定してい
                return;
            }

            // cancelflg = 1; (キャンセル起動中)
            $('#k' + order_no).data('cancelflg', 1);

            let count = 5;
            const count_down = () => {

                // let str = '完成まで\n' + count;
                let string = '完成まで\n ' + count;

                // str = str.replace(/(\r\n|\n|\r)/gm, '<br>');
                // let result = string.replace(/\n/, '<br>');

                $('#k' + order_no).text(string);

                count--;

            }

            // 最初の1回用
            count_down();


            // "完成"押下後 5秒間カウントダウン
            const intervalId = setInterval(() => {

                let kansei_cancel_flg = $('#k' + order_no).data('cancelflg');
                console.log("kansei_cancel_flg:" + kansei_cancel_flg);

                count_down();

                if (kansei_cancel_flg == 2) {

                    // 確認用
                    kansei_cancel_flg = $('#k' + order_no).data('cancelflg');
                    console.log("kansei_cancel_flg:" + kansei_cancel_flg);
                    console.log("キャンセルが実行されました");

                    clearInterval(intervalId); //intervalIdをclearIntervalで指定している
                    $('#k' + order_no).text('完成');
                    $('#k' + order_no).data('cancelflg', 0);

                    // 確認用
                    kansei_cancel_flg = $('#k' + order_no).data('cancelflg');
                    console.log("kansei_cancel_flg:" + kansei_cancel_flg);

                    return;
                }


                // キャンセルが無かった場合
                if (count == -1) {
                    clearInterval(intervalId); //intervalIdをclearIntervalで指定している

                    $('#c' + order_no).text('調理済み');
                    $('#k' + order_no).text('精算待ち');
                    $('#k' + order_no).removeClass('btn-info');
                    $('#k' + order_no).addClass('btn-success');
                    $('#o' + order_no).data('status', 3);

                    // let data = {
                    //     order_id: order_no,
                    //     order_status: 3,
                    //     alot: update_alot,
                    //     blot: update_blot,
                    //     clot: update_clot,
                    //     dlot: update_dlot,
                    // }

                    // console.log("data:" + data);

                    // put_order_status(data);
                }
            }, 1000);

            break;

        case 2:
            // たぶん存在しない
            break;


        case 3:

            // 任意のデータ(税込価格)を取得
            let o_price = document.getElementById('p' + order_no).textContent - 0;

            let today_t_price_num = $('#today_t_price_num').text() - 0;

            // 合計(裏) + オーダー金額(裏)
            today_t_price_num += o_price;

            $('#today_t_price_num').text(today_t_price_num);
            $('#today_t_price').text(today_t_price_num.toLocaleString());

            $('#o' + order_no).removeClass('bg-white');
            $('#o' + order_no).addClass('bg-secondary');
            $('#o' + order_no).addClass('finish');

            $('#c' + order_no).removeClass('btn-warning');
            $('#c' + order_no).addClass('disabled');

            $('#k' + order_no).text('精算済み');
            $('#k' + order_no).removeClass('btn-success');
            $('#k' + order_no).addClass('disabled pointer');

            let section_data = document.getElementById('s' + order_no);
            $('#finish').prepend(section_data);

            // 経過時間 変更
            $('#ln' + order_no).text('精算');

            let dt = new Date();
            let hours = dt.getHours();
            let minutes = dt.getMinutes();

            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            // 分は２ケタにする
            let time = hours + ' : ' + minutes;
            $('#l' + order_no).text(time);
            $('#lm' + order_no).text('');



            // let data = {
            //     order_id: order_no,
            //     // order_status: 2,
            //     alot: update_alot,
            //     blot: update_blot,
            //     clot: update_clot,
            //     dlot: update_dlot,
            // }
            // put_order_status(data);


            break;
    }

}

const put_order_status = (data) => {

    $.ajax({
            //POST通信
            type: "POST",
            url: "tablet/putcook",
            data: JSON.stringify(data),
            contentType: 'application/json',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            }
        })
        //通信が成功したとき
        .then((res) => {
            console.log(res);
        })
        //通信が失敗したとき
        .fail((error) => {
            console.log(error.statusText);
        });


}

const add_order = (order) => {

    // nミリ秒毎 に実行
    setInterval(rewrite_lapsed_time, 2000);

    // rewrite_lapsed_time();
    let section_class = '';

    let cook_class = '';
    let cook_text = '';

    let kansei_class = '';
    let kansei_text = '';

    let ol_class = '';

    // 各ステータスに応じたクラス, テキスト
    switch (order.order_status) {
        // 受付
        case 0:
            cook_class = 'btn btn-warning border border-dark';
            cook_text = '調理開始';

            kansei_class = 'btn btn-light border border-dark disabled pointer';
            kansei_text = '完成';

            section_class = 'border border-secondary mb-3 d-flex bg-white';

            ol_class = 'border text-center d-flex align-items-center justify-content-center bg-success"'

            break;

            // 調理中
        case 1:
            cook_class = 'btn disabled pointer border border-dark';
            cook_text = '調理中';

            kansei_class = 'btn btn-info border border-dark';
            kansei_text = '完成';

            section_class = 'border border-secondary mb-3 d-flex bg-white';

            ol_class = 'border text-center d-flex align-items-center justify-content-center"'


            break;

        case 2:
            break;

            // 完了(通知送信済み)
        case 3:
            kansei_class = 'btn btn-success border border-dark';
            kansei_text = '精算待ち';

            cook_class = 'btn disabled pointer border border-dark';
            cook_text = '調理済み';

            section_class = 'border border-secondary mb-3 d-flex bg-white';

            ol_class = 'border text-center d-flex align-items-center justify-content-center"'

            break;


            // 精算済み
        case 4:
            kansei_class = 'btn border border-dark disabled pointer';
            kansei_text = '精算済み';

            cook_class = 'btn disabled pointer border border-dark';
            cook_text = '調理済み';

            section_class = 'border border-secondary mb-3 d-flex bg-secondary finish';

            ol_class = 'border text-center d-flex align-items-center justify-content-center disabled pointer textdecoration_linethrough"'

            break;

            // キャンセル
        case -1:
            cook_class = 'btn disabled pointer border border-dark';
            cook_text = '取り消し';

            kansei_class = 'btn disabled pointer border border-dark';
            kansei_text = '取り消し';

            section_class = 'border border-secondary mb-3 d-flex bg-secondary finish';

            // disabled pointer textdecoration_linethrough
            ol_class = 'border text-center d-flex align-items-center justify-content-center disabled pointer textdecoration_linethrough"'


            break;

        default:
            break;

    }

    let html = '';

    html += '         <section id="s' + order.order_id + '" class="mt-3" >'
    html += '           <div name="order" data-status="' + order.order_status + '"  id="o' + order.order_id + '"class="' + section_class + '" style="width:94%; height:100px; margin-left:3%; ">'
    html += ''
    html += '         <div class="d-flex align-items-center justify-content-center" style=" width: 130px; ">'
    html += '             <div id="ol' + order.order_id + '" onclick="click_order_number(' + order.order_id + ')" class="' + ol_class + '" style="width: 70px; height: 70px; font-size: 30px; border-radius: 50%; border-color: black !important;">' + order.order_id + '</div>'
    html += '         </div>'
    html += ''
    html += '         <div class="d-flex pl-2" style="width: 280px; height: 100px;">'
    html += ''
    html += '             <div class=" flex-column " style="width: 23%;  margin: auto;">'
    html += '                 <div class="text-center height: 30%;">'
    html += '                     <div id="" style="font-size: 20px; ">A</div>'
    html += '                 </div>'
    html += '                 <div class="d-flex flex-row bd-highlight align-items-center justify-content-center">'
    html += '                     <div id="a_' + order.order_id + '" class="text-center" style=" width: 100%; height:100%; font-size: 30px;"> ' + order.a_quantity + '</div>'
    html += '                 </div>'
    html += '             </div>'
    html += ''
    html += '             <div class=" flex-column " style="width: 23%;  margin: auto;">'
    html += '                 <div class="text-center height: 30%;">'
    html += '                     <div id="" style="font-size: 20px; ">B</div>'
    html += '                 </div>'
    html += '                 <div class="d-flex flex-row bd-highlight align-items-center justify-content-center">'
    html += '                     <div ="b_' + order.order_id + '" class="text-center" style=" width: 100%; height:100%; font-size: 30px;">' + order.b_quantity + '</div>'
    html += '                 </div>'
    html += '             </div>'
    html += ''
    html += '             <div class=" flex-column " style="width: 23%;  margin: auto;">'
    html += '                 <div class="text-center height: 30%;">'
    html += '                     <div id="" style="font-size: 20px; ">C</div>'
    html += '                 </div>'
    html += '                 <div class="d-flex flex-row bd-highlight align-items-center justify-content-center">'
    html += '                     <div ="c_' + order.order_id + '" class="text-center" style=" width: 100%; height:100%; font-size: 30px;">' + order.c_quantity + '</div>'
    html += '                 </div>'
    html += '             </div>'
    html += ''
    html += '             <div class=" flex-column " style="width: 23%;  margin: auto;">'
    html += '                 <div class="text-center height: 30%;">'
    html += '                     <div id="" style="font-size: 20px; ">D</div>'
    html += '                 </div>'
    html += '                 <div class="d-flex flex-row bd-highlight align-items-center justify-content-center">'
    html += '                     <div ="d_' + order.order_id + '" class="text-center" style=" width: 100%; height:100%; font-size: 30px;">' + order.d_quantity + '</div>'
    html += '                 </div>'
    html += '             </div>'
    html += ''
    html += '         </div>'
    html += '         <div class="flex-column d-flex align-items-center justify-content-center" style=" height: 100px; width: 200px; ">'
    html += '             <button id="c' + order.order_id + '" data-code="' + order.order_id + '" name="cooking" onclick="click_cook(' + order.order_id + ')" class="' + cook_class + '" style="width: 150px; height:70px;font-size: 25px; ">' + cook_text + '</button>'
    html += '         </div>'
    html += ''
    html += '         <div class="flex-column d-flex  justify-content-center text-right" style="width: 190px; font-size: 20px; ">'
    html += '             <div class="mr-4" style="font-size: 35px; ">￥' + order.total_amount.toLocaleString() + '</div>'
    html += '             <div id="p' + order.order_id + '" class="d-none">' + order.total_amount + '</div>'
    html += '         </div>'
    html += ''
    html += '         <div class="flex-column d-flex align-items-center justify-content-center" style="width: 190px; font-size: 24px; ">'
    html += '             <div class="d-flex" style="width: 130px; ">'
    html += '                 <div class="mr-1">受付</div>'
    html += '                 <div id="r' + order.order_id + '">' + order.order_tm + '</div>'
    html += '                 <div name="uketsuke" id="rh' + order.order_id + '" class="mr-1 d-none" > ' + order.order_dt + ' ' + order.order_tm + '</div>'
    html += ''
    html += '             </div>'
    html += '             <div class="d-flex" style="width:130px; ">'
    html += '                 <div name="keika_name" class="mr-1" id="ln' + order.order_id + '" >経過</div>'
    html += '                 <div name="keika" id="l' + order.order_id + '" class="mr-1" >' + lapsed_time + '</div>'
    html += '                 <div id="lm' + order.order_id + '">分</div>'
    html += '             </div>'
    html += ''
    html += '         </div>'
    html += ''
    html += '         <div class="flex-column d-flex align-items-center justify-content-center" style=" height: 100px; width: 200px;">'
    html += '             <button id="k' + order.order_id + '" data-code="' + order.order_id + '" data-cancelflg="0" name="kansei" onclick="click_kansei(' + order.order_id + ')" class="' + kansei_class + '" style="width: 150px; height:70px; font-size: 25px;" >' + kansei_text + '</button>'
    html += '         </div>'
    html += ''
    html += '     </div>'
    html += ' </section>'
    html += ''



    // 精算済み or キャンセル済み
    if (order.order_status == 4 || order.order_status == -1) {

    } else {
        document.getElementById('sale').insertAdjacentHTML('beforeend', html);

    }


}

// オーダーキャンセル
const click_order_number = (order) => {

    // １度キャンセルしたオーダーを連続キャンセル不可
    let cook_btn = $('#c' + order).text();

    // "調理開始"以外はキャンセル不可
    if (cook_btn != "調理開始") {
        return
    }

    let html = '';
    html += '<div class="w-100 mb-4">';
    html += '   <div class="" style="margin-top: auto; margin-bottom: auto; font-size:150%; color:red;" >注文を取り消しますか？</div>';
    html += '<div></BR></div>';
    html += '<div class="d-flex align-items-center justify-content-center" style=" width: 150px; margin:auto;">';
    html += '<div id="cancel_order_number" class="border text-center d-flex align-items-center justify-content-center" style="width: 70px; height: 70px; font-size: 30px; border-radius: 50%; border-color: black !important; ">' + order + '</div>';
    html += '</div>'
    html += '<div></BR></div>';
    html += '   <div class = "d-flex w-100">';
    html += '       <button class="btn  btn-danger  border border-dark  mt-3"  style=" margin:auto; width:25%; font-size:28px;" onClick= zaiko_close() >いいえ</button>';
    html += '       <button class="btn  btn-info border border-dark ml-3 mt-3"  style=" margin:auto; width:25%; font-size:28px;" onClick= zaiko_close("order_cancel")>はい</button>';
    html += '   </div>';
    html += '</div>';
    Swal
        .fire({
            // icon: 'question',
            // title: 'ログアウト確認',
            html: html,
            // customClass: 'swal-wide',
            showConfirmButton: false,
            // showCancelButton: true,
            // confirmButtonText: 'はい',
            // confirmButtonColor: '#3085D6',
            // cancelButtonText: 'いいえ',
            // cancelButtonColor: '#d33',
        })
        .then((result) => {
            // どっちが押されたか
            if (result.isConfirmed) {
                // はい押下
                Swal.fire('( 仮 )', 'ログアウトしました', 'success');
            } else {
                // いいえ押下
                // Swal.fire( '(仮)', 'ログアウトを<BR>キャンセルしました', 'info' );
            }
        });
}

// 経過時間
let lapsed_time = 0;
// 経過時刻書き換え
function rewrite_lapsed_time() {

    // 現在の時間
    let dt = new Date();
    // console.log("dt:" + dt); ?

    // 受付時刻
    let uketsuke = document.getElementsByName('uketsuke');

    for (let i = 0; i < uketsuke.length; i++) {

        // i 番目の 受付時刻
        // let uketsuke_time = uketsuke[i].textContent
        let uketsuke_time = new Date(uketsuke[i].textContent);


        // console.log("uketusuke_time:" + uketsuke_time);

        // // i番目の 経過時刻 = 現時刻 - i番目の 受付時刻
        let lapsed_time = dt - uketsuke_time;

        // // ミリ秒 -> 分
        const min = Math.floor(lapsed_time / 1000 / 60);

        // // 精算済み-> 経過[分]から精算時刻
        let keika_name = document.getElementsByName('keika_name');

        if (keika_name[i].textContent == '経過') {

            //     // i 番目 経過時刻書き換え
            let keika = document.getElementsByName('keika');
            keika[i].textContent = min + '';

        }


    };
};



function rewrite_cancel_time() {

    // 現在の時間
    let dt = new Date();

    // 受付時刻
    let uketsuke = document.getElementsByName('uketsuke');

    for (let i = 0; i < uketsuke.length; i++) {

        let uketsuke_test = uketsuke[i].textContent;
        // i 番目の 受付時刻
        let uketsuke_time = new Date(uketsuke[i].textContent);

        // i番目の 経過時刻 = 現時刻 - i番目の 受付時刻
        let lapsed_time = dt - uketsuke_time;

        // ミリ秒 -> 分
        const min = Math.floor(lapsed_time / 1000 / 60);

        // 精算済み-> 経過[分]から精算時刻
        let keika_name = document.getElementsByName('keika_name');

        if (keika_name[i].textContent == '経過') {

            // i 番目 経過時刻書き換え
            let keika = document.getElementsByName('keika');
            keika[i].textContent = min + '';

        }


    };
};
// // nミリ秒毎 に実行
// setInterval(rewrite_lapsed_time, 1000);

// オーダー状況が押された時