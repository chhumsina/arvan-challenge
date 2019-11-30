import Vue from 'vue';

Vue.mixin({
  methods: {
    joinSpace: (input) => {
      if (!input) {
        return;
      }
      return String(input).split(' ').join('-');
    },
    removeDash: (input) => {
      if (!input) {
        return;
      }
      return String(input).split('-').join(' ');
    },
    scrollTop: (amount = 0) => {
      if (!process.browser) {
        return;
      }

      window.scroll({
        top: amount,
        left: 0,
        behavior: 'smooth'
      });
    },
    print: () => {
      if (!process.browser) {
        return;
      }

      window.print();
    },
    toEnglishDigit: (number) => {
      if (!number || number === '') {
        return null;
      }
      if (typeof number === 'number') {
        return number;
      }
      return number.replace(/[\u0660-\u0669]/g, (c) => {
        return c.charCodeAt(0) - 0x0660;
      }).replace(/[\u06F0-\u06F9]/g, (c) => {
        return c.charCodeAt(0) - 0x06F0;
      });
    },
    toPersianDigit: (number) => {
      const persianNumbers = '۰۱۲۳۴۵۶۷۸۹';
      if (number) {
        number = number.toString();
        for (let index = 0; index < 10; index++) {
          const numRegex = new RegExp('' + index, 'g');
          number = number.toString().replace(numRegex, persianNumbers[index]);
        }
        return number;
      }
    },
    guid: () => {
      function idGenerator() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }

      return idGenerator() + idGenerator() + '-' + idGenerator() + '-' + idGenerator() + '-' + idGenerator() + '-' + idGenerator() + idGenerator() + idGenerator();
    },
    isEmpty(obj) {
      const hasOwnProperty = Object.prototype.hasOwnProperty;
      if (obj == null) {
        return true;
      }
      if (obj.length > 0) {
        return false;
      }
      if (obj.length === 0) {
        return true;
      }

      // eslint-disable-next-line no-unused-vars
      for (const key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          return false;
        }
      }

      return true;
    },
    findBrowser() {
      if (!process.browser) {
        return;
      }

      /**
       * Opera 8.0+
       * @type {boolean}
       */
      const isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.includes(' OPR/');
      if (isOpera) {
        return 'isOpera';
      }

      /**
       * Firefox 1.0+
       * @type {boolean}
       */
      const isFirefox = typeof InstallTrigger !== 'undefined';
      if (isFirefox) {
        return 'isFirefox';
      }

      /**
       * Safari 3.0+ "[object HTMLElementConstructor]"
       * @type {boolean | *}
       */
      const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
        return p.toString() === '[object SafariRemoteNotification]';
      })(!window.safari || (typeof window.safari !== 'undefined' && window.safari.pushNotification));
      if (isSafari) {
        return 'isSafari';
      }

      /**
       * Internet Explorer 6-11
       * @type {boolean}
       */
      const isIE = /* @cc_on!@ */false || !!document.documentMode;
      if (isIE) {
        return 'isIE';
      }

      /**
       * Edge 20+
       * @type {boolean}
       */
      if (!isIE && !!window.StyleMedia) {
        return 'isEdge';
      }

      /**
       * Chrome 1 - 71
       * @type {boolean}
       */
      const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
      if (isChrome) {
        return 'isChrome';
      }

      /**
       * Blink engine detection
       * @type {boolean}
       */
      if ((isChrome || isOpera) && !!window.CSS) {
        return 'isBlink';
      }
    },
    isIOSDevice() {
      if (!process.browser) {
        return;
      }
      return (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) || (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform));
    },
    isMobile() {
      if (!process.browser) {
        return;
      }

      let check = false;
      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
          check = true;
        }
      })(self.navigator.userAgent || self.navigator.vendor);
      return check;
    },
    objectSize(obj) {
      let size = 0;
      let key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          size++;
        }
      }
      return size;
    },
    validURL(str) {
      if (!str || str === '') {
        return true;
      }

      const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
      return !!pattern.test(str);
    },
    convertDate(input) {
      const date = new Date(input);
      let day = String(date.getDate());
      let month = String(date.getMonth() + 1);
      const year = String(date.getFullYear());

      if (month.length === 1) {
        month = `0${month}`;
      }
      if (day.length === 1) {
        day = `0${day}`;
      }

      return `${year}-${month}-${day}`;
    },
    handleErrors(error) {
      const response = error.response;
      if (response && response.data) {
        const { status, data } = response;

        /**
         * $notify notification to user
         */
        this.$notify({
          group: 'axios',
          clean: true
        });

        if (data.data) {
          const message = data.data;
          if (Number(status) === 422) {
            let i;
            for (i in message) {
              if (message.hasOwnProperty(i)) {
                /**
                 * $notify notification to user
                 */
                this.$notify({
                  group: 'axios',
                  type: 'danger',
                  text: message[i]
                });
              }
            }
          }
        } else {
          this.$notify({
            group: 'axios',
            type: 'danger',
            text: data.message
          });
        }
      }
    },
    handleValidationErrors({ response }) {
      console.log(response);
    },

    // application
    getStandalone() {
      return this.$auth && this.$auth.$storage && this.$auth.$storage.getUniversal('standalone');
    },
    setStandalone() {
      this.$auth.$storage.setUniversal('standalone', true);
    },
    isInvestor() {
      const getRole = this.$auth.$storage.getUniversal('u');
      const roleName = getRole ? String(getRole).toLowerCase() : null;
      const role = roleName || (this.$auth.$state.user ? String(this.$auth.$state.user.role).toLowerCase() : null);

      return this.$auth.$state.loggedIn && role && role === this.investor();
    },
    isShareholder() {
      const getRole = this.$auth.$storage.getUniversal('u');
      const roleName = getRole ? String(getRole).toLowerCase() : null;
      const role = roleName || (this.$auth.$state.user ? String(this.$auth.$state.user.role).toLowerCase() : null);

      return this.$auth.$state.loggedIn && role && role === this.shareholder();
    },
    isAdmin() {
      const getRole = this.$auth.$storage.getUniversal('u');
      const roleName = getRole ? String(getRole).toLowerCase() : null;
      const role = roleName || (this.$auth.$state.user ? String(this.$auth.$state.user.role).toLowerCase() : null);

      return this.$auth.$state.loggedIn && role && role === this.admin();
    },
    investor() {
      return 'investor';
    },
    shareholder() {
      return 'shareholder';
    },
    admin() {
      return 'super_admin';
    },
    logoutOperation(redirect = true) {
      /**
       * remove user info
       */
      this.$auth.setUser(null);

      /**
       * remove data in storage
       */
      this.$auth.$storage.removeUniversal('u'); // user role name
      this.$auth.$storage.removeUniversal('dn');
      this.$auth.$storage.removeUniversal('da');

      this.$auth.logout();

      if (redirect) {
        this.$router.push({ name: 'index' });
      }
    },
    findRole(input) {
      switch (input) {
        case this.investor():
          return 'متقاضی خرید';
        case this.shareholder():
          return 'متقاضی فروش';
      }
    },
    findStatisticsName(input) {
      switch (input) {
        case 'verifiedInvestors':
          return 'تعداد سرمایه‌گذاران تایید شده';
        case 'activeInvestors':
          return 'تعداد سرمایه‌گذاران در انتظار تایید';
        case 'activeShareholders':
          return 'تعداد خریداران';
        case 'verifiedSeller':
          return 'تعداد سهام‌های تایید شده';
        case 'pendingSeller':
          return 'تعداد سهام‌های در انتظار تایید';
        case 'applicants':
          return 'تعداد متقاضیان خرید';
      }
    },
    findDocCaption(input) {
      switch (input) {
        case 'share_certificate':
          return 'برگه سهام';
        case 'share_journal':
          return 'دفتر سهام شرکت';
        case 'shareholder_agreement':
          return 'قرارداد تفاهم‌نامه سهام‌داری';
        case 'other_docs':
          return 'سایر مدارک';
        case 'national_card':
          return 'تصویر کارت ملی';
        default:
          return 'سایر مدارک';
      }
    },
    findStatus(input) {
      switch (input) {
        case 'done':
          return 'معامله انجام شده';
        case 'pending':
          return 'در حال بررسی';
        case 'trading':
          return 'در حال معامله';
        case 'rejected':
          return 'رد شده';
        case 'active':
          return 'فعال';
        case 'verified':
          return 'تایید هویت';
        case 'block':
          return 'مسدود';
        case 'sign_up':
          return ' در انتظار ارسال مدارک';
        case 'pre_sign_up':
          return 'ایمیل تایید نشده';
        case 'incomplete':
          return 'ارسال مدارک';
      }
    },
    findShareStatus(input) {
      switch (input) {
        case 'pending':
          return 'درحال بررسی';
        case 'rejected':
          return 'رد شده';
        case 'verified':
          return 'تایید شده';
        case 'incomplete':
          return 'ارسال مدارک';
      }
    },
    findImageName(input) {
      switch (input) {
        case 1:
          return 'b8baf25f5b6224709663d3b8d0fce6c7';
        case 2:
          return '6cd79ba6956a5d97199be43764177909';
        case 3:
          return 'bd5759ec81d8a7b2fdf87b0b29a1ec78';
        case 4:
          return '199905145b5b627eb0ab107293aa48ca';
        case 5:
          return '8519048bb31f472b673cd1d45321e562';
        case 6:
          return 'f0181d2e02235ad5817c149c07451baa';
        case 7:
          return 'c1b68fb9d6ad2bf8f5149114d94581b5';
        case 8:
          return 'dce9a7fc4ab4cce6d9f237e9eab21428';
        case 9:
          return '63f96022ea843efc8e8447d0aef5cade';
        case 10:
          return '5d3ef2252983685e43f0edf803004fb7';
        case 11:
          return 'f9a8f5d3bee58b00cfcb080a5abe5d8c';
        case 12:
          return '3dad85209328010a8cde372452dab734';
        case 13:
          return 'ee309d557120c563574e2b4bdb315b1d';
        case 14:
          return '2cabe84f99a10aeb1e18fb6a432ebb33';
      }
    }
  }
});
