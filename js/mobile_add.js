// 本格的にサーバからデータ貰う際のコーディング一例
// 非同期という、少しテクった形になってます。

/******************************************
 * 商品データを取得する
 ******************************************/
const get_product_data = async () => {
    try {

        // POST
        const post = {
            param : {
                // UID : 'TSUNAGU',
                // MAC : 'AAAAA',
            }
        };

        // データ取得
        const result = await get_product_data_ajax( post );

        console.log( result );

        let dbg = 1;


        // // 既存データをクリア
        // _kafun_jisseki = '';

    //     // NG ( 1 )
    //     if ( result.status != 1 ) {
    //         // アラート表示 ( Error )
    //         swal_msg_error.title = '取得失敗';
    //         swal_msg_error.text  = '' + result.massage;
    //         fnc_modal_error_keep();
    //         // 終了
    //         return false;
    //     };

    //     // NG ( 2 )
    //     if ( result.data == '' ) {
    //         // アラート表示 ( Warning )
    //         swal_msg_warning.title = '無し';
    //         swal_msg_warning.text  = 'ありませんでした';
    //         fnc_modal_warning_keep();
    //         // 終了
    //         return false;
    //     };

    //     // OK
    //     // データ格納
    //     _kafun_jisseki = JSON.parse( result.data_kafun_jisseki );

    //     // 終了
    //     fnc_modal_kill();
    }
    catch ( e ) {

        let dbg2 = e;
        // アラート表示 ( Error )
        // swal_msg_error.title = '取得失敗 ( ' + e.status + ' )';
        // swal_msg_error.text  = '' + e.statusText;
        // fnc_modal_error_keep();
        // 終了
        return false;
    };
};

/******************************************
 * [非同期]ajax[GET]を実施する
 * @param {object} post POSTデータ
 * @returns new Promise
 ******************************************/
const get_product_data_ajax = ( post ) => {
    return new Promise( ( resolve, reject ) => {
        setTimeout( () => {
            $
            .ajax( {
                url         : 'https://jsonplaceholder.typicode.com/todos/',
                type        : 'GET',
                async       : true,
                cache       : true,
                // data        : { 'json' : JSON.stringify( post ) },  //JSONで送信
                dataType    : 'json',
                traditional : true,
            } )
            .then(
                // 正常終了
                function( result ) { resolve( result ); },
                // エラー
                function( jqXHR ) { reject( jqXHR ); }
            )
        }, 100 );
    } )
};


