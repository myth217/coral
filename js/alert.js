/******************************************
 * Alart Class v20220930.1
 * ----------------------------------------
 * ライブラリ sweetalert2 を
 * 制御するための自作クラス
 * ----------------------------------------
 * by Sakoyama
 ******************************************/
class cSwal {

    //コンストラクタ
    constructor() {
            this.active = false;
            this.title  = '';
            this.text   = '';
    };

    // 設定 ( 表題部分 )
    set_title( val ) {
            this.title = '';
            this.title = val;
            return;
    };

    // 設定 ( メッセージ部分 )
    set_text( val ) {
            this.text = '';
            this.text = val;
            return;
    };

    // 処理中
    loding( any_title = '処理中です', any_text = '処理終了までお待ちください' ) {
            // 優先表示解除
            this.active = false;
            this.set_title( any_title );
            this.set_text( any_text );
            // Setting
            const setting = {
                    title             : this.title
                    ,html              : this.text
                    ,allowOutsideClick : false                       //枠外をクリックしても画面を閉じない
                    ,showConfirmButton : false
                    ,onBeforeOpen      : () => { Swal.showLoading(); },
            };
            // View
            Swal.fire( setting );
            // Return
            return;
    };

    // 成功
    success( callback, timer = 5000 ) {
            // 優先表示中
            this.active = true;
            // Setting
            const setting = {
                    icon              : 'success'
                    ,title             : this.title
                    ,html              : this.text
                    ,allowOutsideClick : false
                    ,timerProgressBar  : true
                    ,timer             : timer
            };
            // View
            Swal
            .fire( setting )
            .then( function ( result ) {
                    // CallBack ?
                    if( !( callback === undefined || callback === null ) ) { callback(); };
            } );
            // Return
            return;
    };

    // 成功 ( 表示はそのまま )
    success_keep( callback ) {
            // 優先表示中
            this.active = true;
            // Setting
            const setting = {
                    icon              : 'success'
                    ,title             : this.title
                    ,html              : this.text
                    ,allowOutsideClick : false
                    ,timerProgressBar  : true
            };
            // View
            Swal
            .fire( setting )
            .then( function ( result ) {
                    // CallBack ?
                    if( !( callback === undefined || callback === null ) ) { callback(); };
            } );
            // Return
            return;
    };

    // 失敗
    error( callback, timer = 5000 ) {
            // 優先表示中
            this.active = true;
            // Setting
            const setting = {
                    icon              : 'error'
                    ,title             : this.title
                    ,html              : this.text
                    ,allowOutsideClick : false
                    ,timerProgressBar  : true
                    ,timer             : timer
            };
            // View
            Swal
            .fire( setting )
            .then( function ( result ) {
                    // CallBack ?
                    if( !( callback === undefined || callback === null ) ) { callback(); };
            } );
            // Return
            return;
    };

    // 失敗 ( 表示はそのまま )
    error_keep( callback ) {
            // 優先表示中
            this.active = true;
            // Setting
            const setting = {
                    icon              : 'error'
                    ,title             : this.title
                    ,html              : this.text
                    ,allowOutsideClick : false
                    ,timerProgressBar  : true
            };
            // View
            Swal
            .fire( setting )
            .then( function ( result ) {
                    // CallBack ?
                    if( !( callback === undefined || callback === null ) ) { callback(); };
            } );
            // Return
            return;
    };

    // 警告
    warning( timer = 5000 ) {
            // 優先表示中
            this.active = true;
            // Setting
            const setting = {
                    icon              : 'warning'
                    ,title             : this.title
                    ,html              : this.text
                    ,allowOutsideClick : false
                    ,timerProgressBar  : true
                    ,timer             : timer
            };
            // View
            Swal.fire( setting );
            // Return
            return;
    };

    // 警告 ( 表示はそのまま )
    warning_keep() {
            // 優先表示中
            this.active = true;
            // Alert Setting
            const setting = {
                    icon              : 'warning'
                    ,title             : this.title
                    ,html              : this.text
                    ,allowOutsideClick : false
                    ,timerProgressBar  : true
            };
            // Alert View
            Swal.fire( setting );
            // Return
            return;
    };

    // 情報
    info( timer = 5000 ) {
            // 優先表示中
            this.active = true;
            // Setting
            const setting = {
                    icon              : 'info'
                    ,title             : this.title
                    ,html              : this.text
                    ,allowOutsideClick : false
                    ,timerProgressBar  : true
                    ,timer             : timer
            };
            // View
            Swal.fire( setting );
            // Return
            return;
    };

    // 情報 ( 表示はそのまま )
    info_keep() {
            // 優先表示中
            this.active = true;
            // Alert Setting
            const setting = {
                    icon              : 'info'
                    ,title             : this.title
                    ,html              : this.text
                    ,allowOutsideClick : false
                    ,timerProgressBar  : true
            };
            // Alert View
            Swal.fire( setting );
            // Return
            return;
    };

    // 消去
    kill() {
            // 優先表示中かどうか
            if( !( this.active ) ) {
                    // 優先表示はされていない
                    swal.closeModal();
            };
            return;
    };

};
