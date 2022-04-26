import { _classCallCheck, _createClass } from "./CoreUtils";
import { noop, runInContext as regeneratorRuntime } from "lodash";
import { getI18n } from "@crusader-vue/commons";

const DialogService = /*#__PURE__*/ (function() {
  function DialogService() {
    _classCallCheck(this, DialogService);

    this.modais = [];
  }

  _createClass(DialogService, [
    {
      key: "show",
      value: function show(component) {
        const _this = this;

        const propsData =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};

        if (!CrusaderConfig.router) {
          console.error(
            "[VueCrusader]: Router não configurado -> CrusaderConfig.config({router: router})"
          );
          return;
        }

        return new Promise(
          /*#__PURE__*/ (function() {
            const _ref = _asyncToGenerator(
              /*#__PURE__*/ regeneratorRuntime.mark(function _callee(
                resolve,
                reject
              ) {
                let node, i18n, vm, onClose, qDialog;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        node = document.createElement("div");
                        document.body.appendChild(node);
                        _context.next = 4;
                        return getI18n();

                      case 4:
                        i18n = _context.sent;
                        vm = new component({
                          propsData: propsData,
                          el: node,
                          i18n: i18n,
                          parent: CrusaderConfig.router.app,
                          methods: {
                            close: function close(data) {
                              this.$children[0].hide(data);
                            }
                          },
                          mounted: function mounted() {
                            this.$children[0].show();
                          }
                        });
                        onClose = vm.onClose || noop;

                        _this.modais.push(vm);

                        qDialog = vm.$children[0];
                        qDialog.$on("hide", function(data) {
                          const index = _this.modais.indexOf(vm);

                          _this.modais.splice(index, 1);

                          onClose();
                          vm.$destroy();
                          vm.$el.remove();
                          vm = null;
                          data instanceof MouseEvent
                            ? resolve(null)
                            : resolve(data);
                        });

                      case 10:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              })
            );

            return function(_x, _x2) {
              return _ref.apply(this, arguments);
            };
          })()
        );
      }
    }
  ]);

  return DialogService;
})();
