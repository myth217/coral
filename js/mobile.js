/******************************************
 * 商品クラス
 ******************************************/
class cProduct {

    // コンストラクタ
    constructor() {
        this.code        = ''; // 商品コード
        this.name        = ''; // 商品名
        this.name_kana   = ''; // 商品名カナ
        this.name_abb    = ''; // 商品名略
        this.unit_price  = 0;  // 単価
        this.sales_tax   = 0;  // 消費税
        this.stock       = 0;  // 在庫数
        this.max_stock   = 0;  // 最大在庫数
        this.stasus      = 0;  // 商品販売状況 1:販売中 2:売り切れ 3:現在販売していません
    };

};

/******************************************
 * 商品データ
 ******************************************/
let _product;
let _product_array;

/******************************************
 * アレルギー種類データ
 ******************************************/
let _allergen_category;
let _allergen_category_array;

/******************************************
 * アレルギーデータ
 ******************************************/
let _allergen;
let _allergen_array;

/******************************************
 * 商品
 ******************************************/
let _a_price;
let _b_price;
let _c_price;
let _d_price;

/******************************************
 * 消費税
 ******************************************/
let _tax;


  

// Ready
// 一番最初に処理してほしい処理たちをここに書く。

document.addEventListener( 'DOMContentLoaded', async function() {

    // ------------------------------------------------------------
    // TODO:
    // サイトに関するキャッシュ的なデータをここで消しておくとよいかも？
    // ------------------------------------------------------------

    console.log( 'キャッシュとか消しますね…' );

    document.addEventListener("dblclick", function(e){ e.preventDefault();}, { passive: false });

    no_scaling();

    // ------------------------------------------------------------
    // 要素の幅や高さや表示位置をごにょごにょしようとしている
    // ------------------------------------------------------------

    const H = window.height;
    const W = window.width;

    // head要素
    let header = document.getElementsByTagName( 'header' )[ 0 ];

    // nav要素
    let nav = document.getElementsByTagName( 'nav' )[ 0 ];

    // main要素
    let main = document.getElementsByTagName( 'main' )[ 0 ];



    // main要素
    let footer = document.getElementsByTagName( 'footer' )[ 0 ];


    // オブジェクトの座標情報を変更します。
    main.style.position = 'absolute';
    main.style.top  = header.clientHeight + 'px';

    // 表示
    header.classList.remove( 'invisible' );
    header.classList.add( 'visible' );

    // 表示
    main.classList.remove( 'invisible' );
    main.classList.add( 'visible' );

    // 表示
    footer.classList.remove( 'invisible' );
    footer.classList.add( 'visible' );

    // ------------------------------------------------------------
    // TODO:
    // 商品データをサーバから取得する処理はここかも？
    // ------------------------------------------------------------

    console.log( '商品情報を下さいな…' );

    get_data();

    // ------------------------------------------------------------
    // TODO:
    // 取得した商品データを画面に反映する
    // ------------------------------------------------------------

    console.log( '商品情報を画面に出しましょうかね…' );

    set_data();

    


    // 恐らく　商品プラスマイナス押下時の挙動
    try {

        for (let i = 0; i < _product_array.length; i++) {
            
            document.getElementById( _product_array[i].code + '_sub' ).onclick = ( e ) => { sub_click( e, _product_array[i].code ); set_total_lot(); set_total_price(); };
            document.getElementById( _product_array[i].code + '_add' ).onclick = ( e ) => { add_click( e, _product_array[i].code ); set_total_lot(); set_total_price(); };
            
        }
    }
    catch{
    }

    // 
    // メニュー切り替え

    // タブに対してクリックイベントを適用
    const tabs = document.getElementsByClassName('tab');
    for(let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', tabSwitch, false);
}

// タブをクリックすると実行する関数
function tabSwitch(){
    // タブのclassの値を変更
    document.getElementsByClassName('is-active')[0].classList.remove('is-active');
    this.classList.add('is-active');
    // コンテンツのclassの値を変更
    document.getElementsByClassName('is-show')[0].classList.remove('is-show');
    const arrayTabs = Array.prototype.slice.call(tabs);
    const index = arrayTabs.indexOf(this);
    document.getElementsByClassName('panel')[index].classList.add('is-show');
    };

} , false);

// const get_random = () => {
//     const MIN = 0;
//     const MAX = 5;
//     return ( Math.floor( Math.random() * (MAX + 1 - MIN) ) + MIN ) - 0;
// };
// const sako=[ get_random(),get_random(),get_random(),get_random()]
// console.log( result );

/* ================================================================================================
 * 関数定義 ( ベーシックな書き方 )
 ================================================================================================== */

/**
* タッチ操作での拡大縮小禁止
*/
function no_scaling() {
    document.addEventListener("touchmove", mobile_no_scroll, { passive: false });
}

/**
* タッチ操作での拡大縮小禁止解除
*/
function return_scaling() {
    document.removeEventListener('touchmove', mobile_no_scroll, { passive: false });
}

/**
* 拡大縮小禁止
*/
function mobile_no_scroll(event) {
    // ２本指での操作の場合
    if( event.touches.length > 1 ) {
        // デフォルトの動作をさせない
        event.preventDefault();
    };
};

/******************************************
 * 商品情報を取得する
 ******************************************/
const get_data = () => {

    
    const res = {
        stasus : 1
    ,   msg    : ''
    ,   tax    : 10
    };

    // --------------------------------------------------

    const TAX = {
        tax : 10
    };

    // --------------------------------------------------

    const A = {
        code       : '001'
    ,   name       : 'coffee'
    ,   unit_price : 342
    ,   sales_tax  : 380* ( res.tax / 100 )
    // ,   allergen   : '1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9'
    // ,   allergen   : ',1,,,,1,,,1,,,,1,1,1,,,,,,,,,,,,,,,'
    ,   note       : 'コーヒーです。'
    ,   url        : 'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG'
    ,   category   : 'coffee'

    };

    const B = {
        code       : '002'
    ,   name       : 'tea'
    ,   unit_price : 360
    ,   sales_tax  : 400 * ( res.tax / 100 )
    // ,   allergen   : ',,,,1,1,1,1,1,,,,,,,,,,,,,,,,,,,,,'
    ,   note       : '紅茶です。'
    ,   url        : 'https://upload.wikimedia.org/wikipedia/commons/1/16/Milk_clouds_in_tea.jpeg'
    ,   category   : 'tea'

    };

    const C = {
        code       : '003'
    ,   name       : 'soda'
    ,   unit_price : 360
    ,   sales_tax  : 400 * ( res.tax / 100 )
    // ,   allergen   : ',,1,1,,,,,,,,,,,,,,,,,,,,,,,,,1,'
    ,   note       : 'メロンソーダです。'
    ,   url        : 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Melon_soda.jpg'
    ,   category   : 'softdrink'

    };

    const D = {
        code       : '004'
    ,   name       : 'sandwich'
    ,   unit_price : 720
    ,   sales_tax  : 800 * ( res.tax / 100 )
    ,   allergen   : ',1,,,,,,1,,,,,,,,,1,,,,,,,,,1,,,,'
    ,   note       : 'サンドイッチです。'
    ,   url        : 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Croque_monsieur.jpg'
    ,   category   : 'sandwich'

    };
    const E = {
        code       : '005'
    ,   name       : 'recommend'
    ,   unit_price : 720
    ,   sales_tax  : 800 * ( res.tax / 100 )
    ,   allergen   : ',1,,,,,,1,,,,,,,,,1,,,,,,,,,1,,,,'
    ,   note       : 'おすすめです。'
    ,   url        : 'https://4.bp.blogspot.com/-dlwvNUKhmIY/UgsxgBOMqII/AAAAAAAAXYo/srQCdxJh42Y/s800/osusume_text.png'
    ,   category   : 'recommend'

    };
    const F = {
        code       : '006'
    ,   name       : 'recommend'
    ,   unit_price : 720
    ,   sales_tax  : 800 * ( res.tax / 100 )
    ,   allergen   : ',1,,,,,,1,,,,,,,,,1,,,,,,,,,1,,,,'
    ,   note       : 'アイスコーヒーです。'
    ,   url        : 'https://resources.matcha-jp.com/resize/720x2000/2022/03/23-124352.webp'
    ,   category   : 'recommend'

    };
    const G = {
        code       : '007'
    ,   name       : 'food'
    ,   unit_price : 720
    ,   sales_tax  : 800 * ( res.tax / 100 )
    ,   allergen   : ',1,,,,,,1,,,,,,,,,1,,,,,,,,,1,,,,'
    ,   note       : 'カレーです。'
    ,   url        : 'https://1.bp.blogspot.com/-LHEZgJ6tpeA/UgSL_9y4KrI/AAAAAAAAW5s/DNRPJ4kSvpI/s800/food_curryruce.png'
    ,   category   : 'food'
    };
    const H = {
        code       : '008'
    ,   name       : 'food'
    ,   unit_price : 720
    ,   sales_tax  : 800 * ( res.tax / 100 )
    ,   allergen   : ',1,,,,,,1,,,,,,,,,1,,,,,,,,,1,,,,'
    ,   note       : '海老ピラフです。'
    ,   url        : 'https://3.bp.blogspot.com/-djVmPp_NAP0/UgsxbXrnVXI/AAAAAAAAXXA/sZT188H9Tqg/s800/food_ebi_pilaf.png'
    ,   category   : 'food'

    };
    const I = {
        code       : '009'
    ,   name       : 'sandwich'
    ,   unit_price : 720
    ,   sales_tax  : 800 * ( res.tax / 100 )
    ,   allergen   : ',1,,,,,,1,,,,,,,,,1,,,,,,,,,1,,,,'
    ,   note       : 'ピザトーストです。'
    ,   url        : 'https://1.bp.blogspot.com/-ocRr0y766IA/XwkxkrnOvXI/AAAAAAABaCo/ux6-J7WXx58L5Ou7da9cT7pps1X2poxPwCNcBGAsYHQ/s1600/pan_pizza_toast.png'
    ,   category   : 'sandwich'

    };
    const J = {
        code       : '010'
    ,   name       : 'sandwich'
    ,   unit_price : 720
    ,   sales_tax  : 800 * ( res.tax / 100 )
    ,   allergen   : ',1,,,,,,1,,,,,,,,,1,,,,,,,,,1,,,,'
    ,   note       : 'ランチメニューです。'
    ,   url        : 'https://2.bp.blogspot.com/-RdKZSjs69oQ/WRaTGRAiNMI/AAAAAAABEOM/BZPRYqvHTFU2E4vLPvdKpkA2Z_B8t_IPgCLcB/s800/food_full_english_breakfast.png'
    ,   category   : 'sandwich'

    };

    const PRODUCT = {
        A
    ,   B
    ,   C
    ,   D
    ,   E
    ,   F
    ,   G
    ,   H
    ,   I
    ,   J
    };

    console.log(PRODUCT.A);

    const category = {
        
    }

    _product_array = new Array;
    _product_array.push( A );
    _product_array.push( B );
    _product_array.push( C );
    _product_array.push( D );
    _product_array.push( E );
    _product_array.push( F );
    _product_array.push( G );
    _product_array.push( H );
    _product_array.push( I );
    _product_array.push( J );

    // 商品データを格納
    _product = new Object;
    _product = PRODUCT;

    // END
    return;
};

const bd = ( html, v, ) => {
    return ( '' + html + v + '\n' );
};

/******************************************
 * 商品情報を格納する
 ******************************************/
    const set_data = () => {

    for (let i = 0; i < _product_array.length; i++) {

        console.log(_product_array[i]);

        // i番目の配列の全内容を　let info__product_array　に保存する
        let info__product_array = _product_array[i];
        // methodのadd_htmlに引数としてその情報を渡す
        // その後add_htmlの中の処理を行う
        let info__product_category =[];
        info__product_category = _product_array[i].category;

        // console.log("info__product_category:" + info__product_category[0]);
        
    
    
    switch (_product_array[i].category) {
        case 'recommend':

            add_html(info__product_array, 'recommend');
            break;

        case 'coffee':

            add_html(info__product_array, 'coffee');
            break;


        case 'tea':

            add_html(info__product_array,'tea');
            break;


        case 'softdrink':

            add_html(info__product_array,'softdrink');
            break;
            

        case 'food':

            add_html(info__product_array,'food');
            break;    
        case 'sandwich':

            add_html(info__product_array,'sandwich');
            break;


        case 'recommend':
            add_html(info__product_array,'recommend');

            break;


        default:
            // なにもしない
            break;
    }


    }






    return;
    }




const add_html = (i_product_array, category) => {

    let html = '';
    const TOTAL_PRICE = (i_product_array.unit_price + i_product_array.sales_tax);
        
    html += ' <section class="mb-3">'
    html += '     <div class="d-flex flex-row mt-2 mb-2" style="width:94%; margin-left:2%;">'
    html += '         <div id="' +i_product_array.code+'_image_text" class="mr-1" data-name="' +i_product_array.name+'" data-code="' +i_product_array.code+'" style="width:100px; min-width:110px;  height:110px; " onclick="click_image( this )">'
    html += '             <img class="fit-picture rounded" width="100%" height="100%" src="' +i_product_array.url+'" alt="Grapefruit slice atop a pile of other slices">'
    html += '         </div>'
    html += '         <div>'
    html += '             <div class="" style="width: 100%;">'
    html += '                 <div class="text-left bg-white font-weight-bolder" style="max-height: 20px; min-height: 1px; height: 20%; font-size:0.95rem;">'
    html += '                     <div id="' +i_product_array.code+'_name" class="" style="padding-left: 5px; ">' +i_product_array.name+'</div>'
    html += '                 </div>'
    html += '                 <div class="text-left bg-white" style="margin-top: 2px; margin-bottom: 2px; min-height: 1px; height: 20%; " >'
    html += '                     <div id="' +i_product_array.code+'_note" class="" style="padding-left: 5px; font-size:0.85rem;">'+i_product_array.note+'</div>'
    html += '                 </div>'
    html += '                 <div class="text-left bg-white" >'
    html += '                     <div class="d-flex flex-row">'
    html += '                         <div class="d-flex justify-content-center align-items-center" style="width: 60%;">'
    html += '                             <div id="' +i_product_array.code+'_price" class="text-center bg-white font-weight-bolder" style="padding-left: 10px; background-color: transparent;">' +TOTAL_PRICE.toLocaleString()+'円</div>'
    html += '                             <div id="' +i_product_array.code+'_price_value" class="d-none">' +TOTAL_PRICE+'</div>'
    html += '                         </div>'
    html += '                         <div class="d-flex justify-content-center align-items-center" style="width: 40%;">'
    html += '                             <div class="d-flex flex-row border rounded-pill">'
    html += '                             <div class="d-flex justify-content-center align-items-center mr-2" style="width: 30px; height: 35px;" >'
    html += '                                 <div id="' +i_product_array.code+'_sub" class="float-left icon sub_off"><span class="icon__mark"></span></div>'
    html += '                             </div>'
    html += '                             <div class="d-flex justify-content-center align-items-center" click_imagestyle="width: 20px; min-width: 20px;">'
    html += '                                 <div id="' +i_product_array.code+'_lot" class="font-weight-bolder">0</div>'
    html += '                             </div>'
    html += '                             <div class="d-flex justify-content-center align-items-center ml-2" style="width: 30px;" >'
    html += '                                 <div id="' +i_product_array.code+'_add" class="float-left icon icon--plus add_on" style="padding-right:5px;"><span class="icon__mark"></span></div>'
    html += '                             </div>'
    html += '                         </div>'
    html += '                     </div>'
    html += '                 </div>'
    html += '             </div>'
    html += '         </div>'
    html += '     </div>'
    html += ' </section>'

    document.getElementById(category).insertAdjacentHTML('beforeend', html);

}

/******************************************
 * マイナス押下時の処理
 ******************************************/
const sub_click = ( e, p ) => {

    // 注文数設定
    const LOTMIN = 0; // 最低注文数
    const LOTMAX = 5; // 最大注文数

    // 数量オブジェクトを取得
    let lot = document.getElementById( p + '_lot' );

    // 現在数量が 最低数 以下のとき
    if( lot.textContent - 0 <= LOTMIN ) {
        // 何もしない

        return;
    };

    // 算出
    let new_lot = ( lot.textContent - 0 ) - 1;

    // 注文数量が0以下のとき
    if( new_lot - 0 <= LOTMIN ) {
        // マイナス側を非活性化

        document.getElementById( p + '_sub' ).classList.remove( 'sub_on' );
        document.getElementById( p + '_sub' ).classList.add( 'sub_off' );
    };

    // 注文数量が限界数以上のとき
    if( new_lot - 0 < LOTMAX ) {
        // プラス側を活性化

        document.getElementById( p + '_add' ).classList.remove( 'add_off' );
        document.getElementById( p + '_add' ).classList.add( 'add_on' );
    };

    // 減算した数量を画面に反映
    lot.textContent = '' + new_lot;

    // END
    return;
};

/******************************************
 * プラス押下時の処理
 ******************************************/
const add_click = ( e, p ) => {

    // 注文数設定
    const LOTMIN = 0; // 最低注文数
    const LOTMAX = 5; // 最大注文数

    // 数量オブジェクトを取得
    let lot = document.getElementById( p + '_lot' );

    // 現在数量が 最大数 以上のとき
    if( lot.textContent - 0 >= LOTMAX ) {
        // 何もしない
        return;
    };

    // 算出
    let new_lot = ( lot.textContent - 0 ) + 1;

    // 注文数量が0より多いとき
    if( new_lot - 0 > LOTMIN ) {
        // マイナス側を活性化

        document.getElementById( p + '_sub' ).classList.remove( 'sub_off' );
        document.getElementById( p + '_sub' ).classList.add( 'sub_on' );
    };

    // 注文数量が限界数以上のとき
    if( new_lot - 0 >= LOTMAX ) {
        // プラス側を非活性化

        document.getElementById( p + '_add' ).classList.remove( 'add_on' );
        document.getElementById( p + '_add' ).classList.add( 'add_off' );
    };

    // 加算した数量を画面に反映
    lot.textContent = '' + new_lot;

    // END
    return;
};

/******************************************
 * 合計数量を算出して画面に反映する
 ******************************************/
const set_total_lot = ( e ) => {

    // 総合計数量
    let total_lot = 0;

    // 商品の数だけ数量値を合算していく
    for( let product of _product_array ) {
        try {
            // 数量
            const LOT = document.getElementById( '' + product.code + '_lot' ).textContent - 0;
            // 総合計へ加算
            total_lot = total_lot + LOT;
        }
        catch {
        };
    };

    // 反映
    document.getElementById( 'total_lot' ).textContent = '' + total_lot;
};

/******************************************
 * 合計金額を算出して画面に反映する
 ******************************************/
const set_total_price = ( e ) => {

    // 総合計金額
    let total_price = 0;

    // 商品の数だけ税込金額値を合算していく
    for( let product of _product_array ) {
        try {
            // 税込金額
            const AMOUNT = product.unit_price + product.sales_tax;
            // 数量
            const LOT = document.getElementById( '' + product.code + '_lot' ).textContent - 0;
            // 合計金額
            const TOTAL_PRICE = AMOUNT * LOT;
            // 総合計へ加算
            total_price = total_price + TOTAL_PRICE;
        }
        catch {
        };
    };

    // 反映
    document.getElementById( 'total_price' ).textContent = '' + total_price.toLocaleString();
};

/******************************************
 * 商品画像押下時の処理
 ******************************************/
const click_image = ( e ) => {


    let image_url;
    for( let product of _product_array ) {
        if( product.code == e.dataset.code ) {
            image_url = product.url;
        };
    };

    let code = e.dataset.code;
    let name = e.dataset.name;

    let html = '';
    // html += '<div>───────────────────' + '</div>';
    // html += '<div class="text-left ml-5">商品名：' + name + '</div>';
    // html += '<div>───────────────────' + '</div>';
    html += '<div>商品のアレルギー情報は' + '</div>';
    html += '<div>メニューの「アレルゲン情報」を' + '</div>';
    html += '<div>ご覧ください' + '</div>';

    Swal
    .fire({
        // title: 'Sweet!',
        html        : html
    ,   text        : 'Modal with a custom image.'
    // ,   imageUrl    : 'https://unsplash.it/400/200'
    // ,   imageUrl    : 'https://www.hottomotto.com/files/menu_img/sp_6211s.jpg?id=25421'
    ,   imageUrl    : image_url
    ,   imageWidth  : 300
    ,   imageHeight : 200
    ,   imageAlt    : 'Custom image'
    })
};

const CRLF = "\r\n";                //復帰改行コード（0x0A0D）
const LF = "\n";                    //改行コード（0x0A）

/* ================================================================================================
 * 関数定義 ( 今風な書き方 )
 ================================================================================================== */

/******************************************
 * 未実装項目ボタン押下時の処理
 ******************************************/
const click_making = () => {

    let html = '';
    html += ' <div class="swal_body">' + LF
    html += '    <div class="swal_container">' + LF
    html += '        <header class="border-bottom border-dark mb-1" style="width:100%; height: 10%; background-color: white;">' + LF
    html += '            <div class=" mb-2" style="background-color: white;  z-index: 3;">'
    html += '                <h4 style="border-bottom: 1px solid #c85179;border-left: 10px solid #c85179;padding: 7px;width:90%; margin-left: 5%; margin-top: 3%;">アレルゲン詳細情報</h4>' + LF
    html += '            </div>' + LF
    html += '        </header>' + LF
    html += '        <main class="swal_main">' + LF
    html += '            <table class="ml-2 mr-3 " style=" border-collapse:separate; border-spacing:0;">' + LF
    html += '                <thead class="" style="top: 0px; background-color:rgb(190, 228, 252);">' + LF
    html += '                    <tr>' + LF
    html += '                        <th id="" class="border border-dark text-center" style="top: 0px; background-color:rgb(190, 228, 252); position: sticky; z-index: 1; " colspan="2">商品名</th>' + LF
    html += '                        <th id="" class="border-top border-bottom border-right border-dark " style="top: 0px; min-width:50px; max-width:55px; background-color:rgb(190, 228, 252); position: sticky;">Ａ五目弁当</th>' + LF
    html += '                        <th id="" class="border-top border-bottom border-right border-dark " style="top: 0px; min-width:50px; max-width:55px; background-color:rgb(190, 228, 252); position: sticky;">Ｂかつ弁当</th>' + LF
    html += '                        <th id="" class="border-top border-bottom border-right border-dark " style="top: 0px; min-width:50px; max-width:55px; background-color:rgb(190, 228, 252); position: sticky;">Ｃのり弁当</th>' + LF
    html += '                        <th id="" class="border-top border-bottom border-right border-dark " style="top: 0px; min-width:50px; max-width:55px; background-color:rgb(190, 228, 252); position: sticky;">Ｄ親子弁当</th>' + LF
    html += '                    </tr>' + LF
    html += '                </thead>' + LF
    html += '                <tbody>' + LF

    const ALLERGEN_LIST_A = _product.A.allergen.split(',');
    const ALLERGEN_LIST_B = _product.B.allergen.split(',');
    const ALLERGEN_LIST_C = _product.C.allergen.split(',');
    const ALLERGEN_LIST_D = _product.D.allergen.split(',');

    const cv = ( v ) => {
        return ( v == '1' )? '〇': '';
    };

    const check_allergen = ( v ) => {
        return v == '1';
    };

    for( let index = 0; index < Object.keys( _allergen ).length; index++ ) {

        html += '            <tr class="">' + LF

        if( index == 0 ) {
            html += '                <td id="" class="border-bottom border-right border-left border-dark" style="/*vertical-align: middle;text-align: center;writing-mode:vertical-rl; text-orientation: upright; */background-color: lightpink;" rowspan="7">特定原材料7品目</td>' + LF
        };

        if( index == 7 ) {
            html += '                <td id="" class="border-bottom border-right border-left border-dark" style="/*writing-mode:vertical-rl; vertical-align: middle;text-align: center; text-orientation: upright; */background-color: palegoldenrod ;" rowspan="21">特定原材料に準ずるもの21品目</td>' + LF
        };

        html += '                <td id="" class="border-bottom border-right border-dark text-left" style="min-width:50px;">'   + _allergen[ Object.keys( _allergen )[ index ] ].allergen_name +  '</td>' + LF

        // 各商品のアレルギー値
        for( let product of _product_array ) {

            // アレルギー情報を分割
            const PRODUCT_ALLERGEN = product.allergen.split(',');

            let css_allergen = '';
            let txt_allergen = '';

            if( check_allergen( PRODUCT_ALLERGEN[ index ] ) ) {
                css_allergen = ' allergen_hit';
                txt_allergen = '○';
            };

            html += '                    <td id="" class="border-bottom border-right border-dark text-center ' + css_allergen + '">' + txt_allergen + '</td>' + LF
        };
        html += '            </tr>' + LF
    };

    html += '                </tbody>' + LF
    html += '            </table>' + LF
    html += '        </main>' + LF
    html += '        <footer class="border-top border-dark mt-2" style=" height: 10%;background-color: white">' + LF
    html += '            <div class="d-flex justify-content-center align-items-center rounded-pill mt-2" style="height: 100%;">' + LF
    html += '                <div class="border border-dark rounded-pill d-flex justify-content-center align-items-center" style="width: 95px; height: 40px; background-color: lightgray;"  onClick=swal.close();>閉じる</div>' + LF
    html += '            </div>' + LF
    html += '        </footer>' + LF
    html += '    </div>' + LF
    html += '</div>' + LF

    // _swal.set_title( '' );
    // _swal.set_text( html );
    // _swal.warning();

    // HTML構築
    // let html = '';
    // html += '<BR>';
    // html += '<div class="h3">注文を承りました' + '</div>';
    // html += '<div class="h6">以下の注文番号にて' + '</div>';
    // html += '<div class="h6">お呼びします' + '</div>';
    // html += '<BR>';
    // html += '<div class="h5">注文番号　' + '1' + '</div>';
    // html += '<div>───────────────────' + '</div>';
    // html += '<div class="d-flex flex-column">';
    // html += '  <div >';
    // html += '    <div class="float-left"            style="min-width:15%; min-height:1px;">' + '</div>';
    // html += '    <div class="float-left text-right" style="min-width:35%; min-height:1px;">ご注文数：' + '</div>';
    // html += '    <div class="float-left text-right" style="min-width:30%; min-height:1px;">' + t_lot + ' 点' + '</div>';
    // html += '    <div class="float-left"            style="min-width:20%; min-height:1px;">' + '</div>';
    // html += '  </div>';
    // html += '  <div >';
    // html += '    <div class="float-left"            style="min-width:15%; min-height:1px;">' + '</div>';
    // html += '    <div class="float-left text-right" style="min-width:35%; min-height:1px;">合計金額：' + '</div>';
    // html += '    <div class="float-left text-right" style="min-width:30%; min-height:1px;">' + t_price + ' 円' + '</div>';
    // html += '    <div class="float-left"            style="min-width:20%; min-height:1px;">' + '</div>';
    // html += '  </div>';
    // html += '  <div >';
    // html += '    <div class="float-left"            style="min-width:15%; min-height:1px;">' + '</div>';
    // html += '    <div class="float-left text-right" style="min-width:35%; min-height:1px;">待ち人数：' + '</div>';
    // html += '    <div class="float-left text-right" style="min-width:30%; min-height:1px;">' + t_wait + ' 人' + '</div>';
    // html += '    <div class="float-left"            style="min-width:20%; min-height:1px;">' + '</div>';
    // html += '  </div>';
    // html += '</div>';
    // html += '<div>───────────────────' + '</div>';
    // html += '<div class="h6 text-danger">再注文をされるお客様は' + '</div>';
    // html += '<div class="h6 text-danger">QRコードを再スキャンして下さい' + '</div>';

    Swal
    .fire( {
        // icon               : 'success'
    // ,   title              : '注文を確定しますか？'
    // ,   html               : 'ログアウトを行うとすると<BR>入力中のデータは消えます<BR>よろしいですか？'
        html               : html
    // ,   allowOutsideClick  : false
    ,   showCancelButton   : false
    ,   cancelButtonText   : 'いいえ'
    ,   cancelButtonColor  : '#d33'
    ,   confirmButtonText  : 'はい'
    ,   confirmButtonColor : '#3085D6'
    ,   customClass        : 'swal-custom'
    // ,   customClass        : 'swal-custom'
    ,   reverseButtons     : false
    ,   focusCancel        : false
    ,   showConfirmButton  : false
    } )

    return;
};

const all_close = () => {
    swal.close();
};

/******************************************
 * バージョン情報ボタン押下時の処理
 ******************************************/
const click_version = ( event ) => {

    event.preventDefault();

    let _swal;
    _swal = new cSwal;

    _swal.set_title( 'System Version' );
    _swal.set_text( '0.0.1' );
    _swal.info();nfo();

    return;
};

/******************************************
 * ヘルプボタンボタン押下時の処理
 ******************************************/
const click_help = () => {

    let _swal;
    _swal = new cSwal;

    _swal.set_title( 'Help' );
    _swal.set_text( 'Bootstrap の使い方。。。' );
    _swal.info();

    return;
};

/******************************************
 * 著作権ボタン押下時の処理
 ******************************************/
const click_copyright = () => {

    let _swal;
    _swal = new cSwal;

    _swal.set_title( 'Copyright' );
    _swal.set_text( '©2022 TSUNAGU Inc.' + '<BR>' + 'All Rights Reserved.' );
    _swal.info();

    return;
};

/******************************************
 * ログアウトボタン押下時の処理
 ******************************************/
const click_logout = () => {

    // 本来の SweetAlert2 の書き方になります

    Swal
    .fire( {
        icon               : 'question'
    ,   title              : 'ログアウト確認'
    ,   html               : 'ログアウトを行うとすると<BR>入力中のデータは消えます<BR>よろしいですか？'
    ,   showCancelButton   : true
    ,   confirmButtonText  : 'はい'
    ,   confirmButtonColor : '#3085D6'
    ,   cancelButtonText   : 'いいえ'
    ,   cancelButtonColor  : '#d33'
    } )
    .then( ( result ) => {

        // どっちが押されたか
        if( result.isConfirmed ) {
            // はい押下

            Swal.fire( '( 仮 )', 'ログアウトしました', 'success' );
        }
        else {
            // いいえ押下

            // Swal.fire( '(仮)', 'ログアウトを<BR>キャンセルしました', 'info' );
        }
    } );
};

/******************************************
 * 注文確定ボタン押下時の処理
 ******************************************/
const click_order = () => {

    // 非活性の場合
    // if( document.getElementById( 'order' ).classList.contains( 'disabled' ) ) {
    //     // 抜ける
    //     return;
    // };

    // 本来の SweetAlert2 の書き方になります

    const t_lot   = document.getElementById( 'total' + '_lot' ).textContent;
    const t_price = document.getElementById( 'total' + '_price' ).textContent;

    if( t_lot < 1 ) {
        Swal.fire( '', '注文がありません', 'warning' );
        return;
    };

    let html = '';

    html += '<div class="mt-3">注文を確定しますか？' + '</div>';
    html += '<BR>';
    html += '<div>────────────────' + '</div>';
    html += '<div class="d-flex flex-column">';
    html += '  <div >';
    html += '    <div class="float-left"            style="min-width:15%; min-height:1px;">' + '</div>';
    html += '    <div class="float-left text-right" style="min-width:35%; min-height:1px;">ご注文数：' + '</div>';
    html += '    <div class="float-left text-right" style="min-width:30%; min-height:1px;">' + t_lot + ' 点' + '</div>';
    html += '    <div class="float-left"            style="min-width:20%; min-height:1px;">' + '</div>';
    html += '  </div>';
    html += '  <div >';
    html += '    <div class="float-left"            style="min-width:15%; min-height:1px;">' + '</div>';
    html += '    <div class="float-left text-right" style="min-width:35%; min-height:1px;">合計金額：' + '</div>';
    html += '    <div class="float-left text-right" style="min-width:30%; min-height:1px;">' + t_price + ' 円' + '</div>';
    html += '    <div class="float-left"            style="min-width:20%; min-height:1px;">' + '</div>';
    html += '  </div>';
    html += '</div>';
    html += '<div>────────────────' + '</div>';

    Swal
    .fire( {
        // icon                : 'question'
    // ,   title              : '注文を確定しますか？'
    // ,   html               : 'ログアウトを行うとすると<BR>入力中のデータは消えます<BR>よろしいですか？'
        cancelButtonText    : 'いいえ'
    ,   cancelButtonColor   : '#d33'
    ,   confirmButtonText   : 'はい'
    ,   confirmButtonColor  : '#3085D6'
    ,   focusCancel         : true
    ,   html                : html
    ,   reverseButtons      : true
    ,   showCancelButton    : true
    ,   showLoaderOnConfirm : true
    ,   preConfirm          : function( inputStr ) {

            console.log('preConfirm起動');

            //バリデーションを入れたりしても良い
            // if (inputStr !== 'aaa') {
            //     return Swal.showValidationMessage('aaaを入力してね');
            // };

            //ローディングを表示させるために3秒スリープ
            var sleep = function(sec) {
                return new Promise(resolve => {
                  setTimeout(resolve, sec * 750);
                });
            };

            return sleep(3);

        }
    } )
    .then( ( result ) => {

        // どっちが押されたか
        if( result.isConfirmed ) {
            // はい押下

            const t_wait = 1;

            const order_no = 999;

            // document.getElementById( 'order' ).textContent = '注文済み';
            // document.getElementById( 'order' ).classList.add( 'disabled' );


            document.getElementById( 'order_no' ).textContent = order_no;

            // HTML構築
            let html = '';
            html += '<BR>';
            html += '<div class="h3">注文を承りました' + '</div>';
            html += '<div class="h6 mt-4">以下の注文番号にて' + '</div>';
            html += '<div class="h6">お呼びします' + '</div>';
            // html += '<BR>';
            html += '<div class="mb-1" style="font-size:50px;">' + order_no + '</div>';
            // html += '<BR>';
            // html += '<div>───────────────────' + '</div>';
            // html += '<div class="d-flex flex-column">';
            // html += '  <div >';
            // html += '    <div class="float-left"            style="min-width:15%; min-height:1px;">' + '</div>';
            // html += '    <div class="float-left text-right" style="min-width:35%; min-height:1px;">ご注文数：' + '</div>';
            // html += '    <div class="float-left text-right" style="min-width:30%; min-height:1px;">' + t_lot + ' 点' + '</div>';
            // html += '    <div class="float-left"            style="min-width:20%; min-height:1px;">' + '</div>';
            // html += '  </div>';
            // html += '  <div >';
            // html += '    <div class="float-left"            style="min-width:15%; min-height:1px;">' + '</div>';
            // html += '    <div class="float-left text-right" style="min-width:35%; min-height:1px;">合計金額：' + '</div>';
            // html += '    <div class="float-left text-right" style="min-width:30%; min-height:1px;">' + t_price + ' 円' + '</div>';
            // html += '    <div class="float-left"            style="min-width:20%; min-height:1px;">' + '</div>';
            // html += '  </div>';
            // html += '  <div >';
            // html += '    <div class="float-left"            style="min-width:15%; min-height:1px;">' + '</div>';
            // html += '    <div class="float-left text-right" style="min-width:35%; min-height:1px;">待ち人数：' + '</div>';
            // html += '    <div class="float-left text-right" style="min-width:30%; min-height:1px;">' + t_wait + ' 人' + '</div>';
            // html += '    <div class="float-left"            style="min-width:20%; min-height:1px;">' + '</div>';
            // html += '  </div>';
            // html += '</div>';
            // html += '<div>───────────────────' + '</div>';

            // html += '<div class="h6 text-danger">※再注文をされるお客様は' + '</div>';
            // html += '<div class="h6 text-danger">QRコードを再スキャンして下さい' + '</div>';

            Swal
            .fire( {
                // icon               : 'success'
            // ,   title              : '注文を確定しますか？'
            // ,   html               : 'ログアウトを行うとすると<BR>入力中のデータは消えます<BR>よろしいですか？'
                html               : html
            ,   allowOutsideClick  : false
            ,   showCancelButton   : false
            ,   cancelButtonText   : 'いいえ'
            ,   cancelButtonColor  : '#d33'
            ,   confirmButtonText  : '支払い完了'
            ,   confirmButtonColor : '#3085D6'
            // ,   customClass        : 'swal-custom'
            ,   reverseButtons     : false
            ,   focusCancel        : false
            ,   showConfirmButton  : true,
            } )
            .then( ( result ) => {
                document.getElementById( 'product'    ).classList.add( 'd-none' );
                document.getElementById( 'paycomplet' ).classList.remove( 'd-none' );
            } );
        }
        else {
            // いいえ押下

            // Swal.fire( '(仮)', 'ログアウトを<BR>キャンセルしました', 'info' );
        }
    } );
};

/******************************************
 * 端末情報を取得する
 ******************************************/
const tarminal_name = () => {
    // 初期化
    let tarminal_name = 'PC';
    // 情報取得
    const ut = navigator.userAgent;
    // 評価
    if( ut.indexOf( 'iPhone'  ) > 0                               ) { tarminal_name = 'SmartPhone'; };
    if( ut.indexOf( 'iPod'    ) > 0                               ) { tarminal_name = 'SmartPhone'; };
    if( ut.indexOf( 'Android' ) > 0 && ut.indexOf( 'Mobile' ) > 0 ) { tarminal_name = 'SmartPhone'; };
    if( ut.indexOf( 'Mobile'  ) > 0                               ) { tarminal_name = 'SmartPhone'; };
    if( ut.indexOf( 'iPad'    ) > 0                               ) { tarminal_name = 'Tablet';     };
    if( ut.indexOf( 'Android' ) > 0                               ) { tarminal_name = 'Tablet';     };
    return tarminal_name;
};






const click_nav_menu = ( e ) => {


    // let image_url;
    // for( let product of _product_array ) {
    //     if( product.code == e.dataset.code ) {
    //         image_url = product.url;
    //     };
    // };

    // let code = e.dataset.code;
    // let name = e.dataset.name;

    let html = '';
    // html += '<div>───────────────────' + '</div>';
    // html += '<div class="text-left ml-5">商品名：' + name + '</div>';
    // html += '<div>───────────────────' + '</div>';
    // html += '<div>商品のアレルギー情報は' + '</div>';
    // html += '<div>メニューの「アレルゲン情報」を' + '</div>';

    // html += '<div>ご覧ください' + '</div>';


    // html += '<div>Please select language!</div>' 
    html += '<div>気楽に復讐を!</div>'
    // html += '<div>(TEST）</div>'

    Swal
    .fire({
        // title: 'Sweet!',
        html        : html
    ,   text        : 'Modal with a custom image.'
    // ,   imageUrl    : 'https://unsplash.it/400/200'
    ,   imageUrl    : 'https://wegotthiscovered.com/wp-content/uploads/2022/12/chainsaw-man-cigarette.jpg'
    // ,   imageUrl    : image_url
    ,   imageWidth  : 300
    ,   imageHeight : 200
    ,   imageAlt    : 'Custom image'
    })
};


