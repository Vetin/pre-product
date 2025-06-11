var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
System.register("LanguageOption", ["react/jsx-runtime"], function (exports_1, context_1) {
    "use strict";
    var jsx_runtime_1, LanguageOption;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            }
        ],
        execute: function () {
            LanguageOption = function (_a) {
                var language = _a.language, flag = _a.flag, isSelected = _a.isSelected, onClick = _a.onClick;
                var styles = {
                    languageOption: __assign({ flexBasis: 0, flexGrow: 1, height: '44px', minHeight: '1px', 
                        // minWidth: '1px',
                        position: 'relative', borderRadius: '59px', flexShrink: 0, cursor: 'pointer' }, (isSelected
                        ? {
                            border: '1px solid #8F8FF3',
                            background: '#F5F5FF',
                        }
                        : { background: 'white', border: '1px solid #D0D5DD' })),
                    languageOptionContainer: {
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                    },
                    languageOptionBox: {
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '6px',
                        height: '44px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        position: 'relative',
                        width: '100%',
                    },
                    languageText: {
                        fontFamily: "'Suisse Intl:Regular', sans-serif",
                        fontWeight: 'normal',
                        lineHeight: 0,
                        fontStyle: 'normal',
                        position: 'relative',
                        flexShrink: 0,
                        color: '#101828',
                        fontSize: '16px',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                        letterSpacing: '-0.5px',
                    },
                    languageTextP: {
                        display: 'block',
                        lineHeight: '22px',
                        whiteSpace: 'pre',
                    },
                };
                return (_jsx("div", { style: styles.languageOption, onClick: onClick, children: _jsx("div", { style: styles.languageOptionContainer, children: _jsxs("div", { style: styles.languageOptionBox, children: [flag, _jsx("div", { style: styles.languageText, children: _jsx("p", { style: styles.languageTextP, children: language }) })] }) }) }));
            };
            exports_1("default", LanguageOption);
        }
    };
});
System.register("styles", [], function (exports_2, context_2) {
    "use strict";
    var uploadStyles;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            uploadStyles = {
                container: {
                    backgroundColor: '#ffffff',
                    position: 'relative',
                    borderRadius: '30px',
                    width: '100%',
                    height: '100%',
                },
                innerContainer: {
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                },
                contentBox: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    overflow: 'clip',
                    padding: '40px',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '30px',
                    border: '1px solid #D0D5DD',
                },
                sectionContainer: {
                    position: 'relative',
                    flexShrink: 0,
                    width: '100%',
                },
                sectionBox: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    padding: 0,
                    position: 'relative',
                    width: '100%',
                },
                sectionTitle: {
                    display: 'flex',
                    flexDirection: 'column',
                    fontFamily: "'Suisse Intl:Regular', sans-serif",
                    fontWeight: 'normal',
                    justifyContent: 'center',
                    lineHeight: 0,
                    minWidth: '100%',
                    fontStyle: 'normal',
                    position: 'relative',
                    flexShrink: 0,
                    color: '#000000',
                    fontSize: '24px',
                    textAlign: 'left',
                    letterSpacing: '-0.72px',
                },
                sectionTitleText: {
                    display: 'block',
                    lineHeight: 1.3,
                    fontFamily: 'Suisse Intl',
                    fontSize: '24px',
                    margin: 0,
                },
                dragDropArea: function (dragActive, invalid) {
                    return ({
                        position: 'relative',
                        flexShrink: 0,
                        width: '100%',
                        backgroundColor: dragActive ? '#f5f5ff' : 'transparent',
                        height: '200px',
                        borderRadius: '16px',
                        border: '1px dashed',
                        borderColor: invalid ? '#FDA29B' : '#8f8ff3',
                    });
                },
                dragDropContent: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                },
                dragDropBox: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    height: '200px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px',
                    position: 'relative',
                    width: '100%',
                },
                uploadText: {
                    fontFamily: "'Suisse Intl:Regular', sans-serif",
                    fontWeight: 'normal',
                    lineHeight: 0,
                    fontStyle: 'normal',
                    position: 'relative',
                    flexShrink: 0,
                    color: '#3d3de9',
                    fontSize: '14px',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                },
                uploadTextP: {
                    display: 'block',
                    lineHeight: '22px',
                    whiteSpace: 'pre',
                    margin: 0,
                },
                uploadButton: {
                    position: 'relative',
                    borderRadius: '16px',
                    boxShadow: '0px 1px 2px 0px rgba(20,21,26,0.05)',
                    flexShrink: 0,
                    backgroundColor: '#0000ff',
                    width: '100%',
                    maxWidth: 220,
                    cursor: 'pointer',
                },
                uploadButtonContainer: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'clip',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                },
                uploadButtonBox: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '4px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    paddingTop: '18px',
                    paddingBottom: '18px',
                    position: 'relative',
                    width: 'fit-content',
                },
                uploadButtonText: {
                    fontFamily: "'Suisse Intl:Book', sans-serif",
                    fontWeight: 450,
                    lineHeight: 0,
                    fontStyle: 'normal',
                    position: 'relative',
                    flexShrink: 0,
                    color: '#ffffff',
                    fontSize: '20px',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    letterSpacing: '-0.02em',
                },
                uploadButtonTextP: {
                    display: 'block',
                    lineHeight: '24px',
                    whiteSpace: 'pre',
                    margin: 0,
                },
                fileTypeText: {
                    fontFamily: "'Suisse Intl:Regular', sans-serif",
                    fontWeight: 'normal',
                    lineHeight: 0,
                    fontStyle: 'normal',
                    position: 'relative',
                    flexShrink: 0,
                    color: '#3d3de9',
                    fontSize: '14px',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                },
                fileTypeTextP: {
                    display: 'block',
                    lineHeight: '22px',
                    whiteSpace: 'pre',
                    margin: 0,
                },
                linkInput: {
                    backgroundColor: '#ffffff',
                    height: '54px',
                    position: 'relative',
                    borderRadius: '12px',
                    flexShrink: 0,
                    width: '100%',
                },
                linkInputContainer: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    overflow: 'clip',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                },
                linkInputBox: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '8px',
                    height: '54px',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingLeft: '14px',
                    paddingRight: '14px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    position: 'relative',
                    width: '100%',
                },
                linkInputField: {
                    flexBasis: 0,
                    fontFamily: "'Suisse Intl:Regular', sans-serif",
                    fontWeight: 'normal',
                    flexGrow: 1,
                    lineHeight: 0,
                    minHeight: '1px',
                    minWidth: '1px',
                    fontStyle: 'normal',
                    position: 'relative',
                    flexShrink: 0,
                    fontSize: '16px',
                    textAlign: 'left',
                    border: 'none',
                    outline: 'none',
                },
                linkInputBorder: function (invalid) {
                    return ({
                        position: 'absolute',
                        border: '1px solid',
                        borderStyle: 'solid',
                        inset: 0,
                        pointerEvents: 'none',
                        borderRadius: '12px',
                        borderColor: invalid ? '#FDA29B' : '#d0d5dd',
                    });
                },
                languageOptionsContainer: {
                    position: 'relative',
                    flexShrink: 0,
                    width: '100%',
                },
                languageOptionsBox: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '4px',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    padding: 0,
                    position: 'relative',
                    width: '100%',
                    flexWrap: 'nowrap',
                    overflow: 'auto',
                    scrollbarWidth: 'none',
                },
                languageOption: function (isSelected) {
                    return ({
                        flexBasis: 0,
                        backgroundColor: '#ffffff',
                        flexGrow: 1,
                        height: '44px',
                        minHeight: '1px',
                        // minWidth: '1px',
                        width: 140,
                        position: 'relative',
                        borderRadius: '59px',
                        flexShrink: 0,
                        cursor: 'pointer',
                        border: isSelected ? '1px solid  #8F8FF3' : '1px solid #d0d5dd',
                    });
                },
                languageOptionContainer: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                },
                languageOptionBox: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '6px',
                    height: '44px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    position: 'relative',
                    width: '100%',
                },
                languageText: {
                    fontFamily: "'Suisse Intl:Regular', sans-serif",
                    fontWeight: 'normal',
                    lineHeight: 0,
                    fontStyle: 'normal',
                    position: 'relative',
                    flexShrink: 0,
                    color: '#101828',
                    fontSize: '16px',
                    textAlign: 'left',
                    whiteSpace: 'nowrap',
                    letterSpacing: '-0.5px',
                },
                languageTextP: {
                    display: 'block',
                    lineHeight: '22px',
                    whiteSpace: 'pre',
                },
                toneSelector: {
                    position: 'relative',
                    flexShrink: 0,
                    width: '100%',
                    backgroundColor: '#ffffff',
                    height: '44px',
                    borderRadius: '59px',
                    cursor: 'pointer',
                },
                toneSelectorBorder: {
                    position: 'absolute',
                    border: '1px solid #d0d5dd',
                    borderStyle: 'solid',
                    inset: 0,
                    pointerEvents: 'none',
                    borderRadius: '59px',
                },
                toneSelectorContainer: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                },
                toneSelectorBox: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '6px',
                    height: '44px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    position: 'relative',
                    width: '100%',
                },
                toneText: {
                    fontFamily: "'Suisse Intl:Regular', sans-serif",
                    fontWeight: 'normal',
                    lineHeight: 0,
                    fontStyle: 'normal',
                    position: 'relative',
                    flexShrink: 0,
                    color: '#101828',
                    fontSize: '16px',
                    textAlign: 'left',
                    whiteSpace: 'nowrap',
                    letterSpacing: '-0.5px',
                },
                toneTextP: {
                    display: 'block',
                    lineHeight: '22px',
                    whiteSpace: 'pre',
                },
                iconContainer: {
                    position: 'relative',
                    flexShrink: 0,
                    width: '16px',
                    height: '16px',
                },
                submitButton: function (isDisabled) {
                    return ({
                        position: 'relative',
                        borderRadius: '16px',
                        boxShadow: '0px 1px 2px 0px rgba(20,21,26,0.05)',
                        flexShrink: 0,
                        width: '100%',
                        backgroundColor: isDisabled ? '#d1d1fa' : '#0000ff',
                        cursor: isDisabled ? 'default' : 'pointer',
                    });
                },
                submitButtonContainer: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'clip',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                },
                submitButtonBox: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '4px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    paddingTop: '18px',
                    paddingBottom: '18px',
                    position: 'relative',
                    width: '100%',
                },
                submitButtonText: {
                    fontFamily: "'Suisse Intl:Book', sans-serif",
                    fontWeight: 450,
                    lineHeight: 0,
                    fontStyle: 'normal',
                    position: 'relative',
                    flexShrink: 0,
                    color: '#ffffff',
                    fontSize: '20px',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    letterSpacing: '-0.4px',
                },
                submitButtonTextP: {
                    display: 'block',
                    lineHeight: '24px',
                    whiteSpace: 'pre',
                    margin: 0,
                },
                flagContainer: {
                    position: 'relative',
                    flexShrink: 0,
                    width: '24px',
                    height: '24px',
                },
                flagBox: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'clip',
                    padding: 0,
                    position: 'relative',
                    width: '24px',
                    height: '24px',
                },
                flagSize: {
                    height: '16px',
                    position: 'relative',
                    flexShrink: 0,
                    width: '22px',
                },
                flagSvg: {
                    display: 'block',
                    width: '100%',
                    height: '100%',
                },
                englishFlagContainer: {
                    overflow: 'clip',
                    position: 'relative',
                    flexShrink: 0,
                    width: '24px',
                    height: '24px',
                },
                englishFlagInner: {
                    position: 'absolute',
                    height: '16px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '22px',
                },
                // Uploaded file styles
                uploadedFileContainer: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #D0D5DD',
                    borderRadius: '16px',
                    position: 'relative',
                    flexShrink: 0,
                    width: '100%',
                    boxSizing: 'border-box',
                },
                uploadedFileContent: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    flex: 1,
                    overflow: 'hidden',
                },
                uploadedFileIcon: {
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    flexShrink: 0,
                },
                uploadedFileInfo: {
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    minWidth: 0,
                },
                uploadedFileName: {
                    fontFamily: "'Suisse Intl:Regular', sans-serif",
                    fontSize: '16px',
                    lineHeight: '22px',
                    fontWeight: 500,
                    color: '#101828',
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                },
                uploadedFileSize: {
                    fontFamily: "'Suisse Intl:Regular', sans-serif",
                    fontWeight: 'normal',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#667085',
                    margin: 0,
                },
                uploadedFileRemove: {
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    color: '#667085',
                    fontSize: '16px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    flexShrink: 0,
                    transition: 'background-color 0.15s ease',
                },
            };
            exports_2("default", uploadStyles);
        }
    };
});
System.register("Select", ["react/jsx-runtime", "react", "react-dom"], function (exports_3, context_3) {
    "use strict";
    var jsx_runtime_2, react_1, react_dom_1, Select;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (jsx_runtime_2_1) {
                jsx_runtime_2 = jsx_runtime_2_1;
            },
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (react_dom_1_1) {
                react_dom_1 = react_dom_1_1;
            }
        ],
        execute: function () {
            exports_3("Select", Select = function (_a) {
                var options = _a.options, value = _a.value, onChange = _a.onChange, _b = _a.placeholder, placeholder = _b === void 0 ? 'Select option' : _b, style = _a.style;
                var _c = react_1.useState(false), isOpen = _c[0], setIsOpen = _c[1];
                var _d = react_1.useState(null), hoveredOptionValue = _d[0], setHoveredOptionValue = _d[1];
                var _e = react_1.useState({
                    top: 0,
                    left: 0,
                    centerX: 0,
                }), dropdownPosition = _e[0], setDropdownPosition = _e[1];
                var containerRef = react_1.useRef(null);
                var dropdownRef = react_1.useRef(null);
                var selectedOption = react_1.useMemo(function () { return options.find(function (option) { return option.value === value; }); }, [options, value]);
                var calculateDropdownPosition = function () {
                    if (containerRef.current) {
                        var rect = containerRef.current.getBoundingClientRect();
                        setDropdownPosition({
                            top: rect.bottom + 4,
                            left: rect.left,
                            centerX: rect.left + rect.width / 2,
                        });
                    }
                };
                var handleToggle = function () {
                    if (!isOpen) {
                        calculateDropdownPosition();
                    }
                    setIsOpen(!isOpen);
                };
                var handleOptionSelect = function (optionValue) {
                    onChange(optionValue);
                    setIsOpen(false);
                };
                // Close dropdown when clicking outside
                react_1.useEffect(function () {
                    var handleClickOutside = function (event) {
                        var _a, _b;
                        if (!((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target)) &&
                            !((_b = dropdownRef.current) === null || _b === void 0 ? void 0 : _b.contains(event.target))) {
                            setIsOpen(false);
                        }
                    };
                    var handleScroll = function () {
                        if (isOpen) {
                            calculateDropdownPosition();
                        }
                    };
                    var handleResize = function () {
                        if (isOpen) {
                            calculateDropdownPosition();
                        }
                    };
                    document.addEventListener('mousedown', handleClickOutside);
                    window.addEventListener('scroll', handleScroll, true);
                    window.addEventListener('resize', handleResize);
                    return function () {
                        document.removeEventListener('mousedown', handleClickOutside);
                        window.removeEventListener('scroll', handleScroll, true);
                        window.removeEventListener('resize', handleResize);
                    };
                }, [isOpen]);
                var renderDropdown = function () {
                    var portalElement = document.getElementById('portal');
                    if (!portalElement || !isOpen)
                        return null;
                    return react_dom_1.createPortal(_jsx("div", { ref: dropdownRef, style: {
                            position: 'fixed',
                            top: dropdownPosition.top,
                            left: dropdownPosition.centerX,
                            transform: 'translateX(-50%)',
                            backgroundColor: 'white',
                            border: '1px solid var(--Gray-200---stroke, #EAECF0)',
                            borderRadius: '16px',
                            boxShadow: '0px 4px 6px -2px #10182808, 0px 12px 16px -4px #10182814',
                            zIndex: 10000,
                            minWidth: 'max-content',
                            width: 220,
                            maxHeight: 192,
                            overflowY: 'auto',
                        }, children: options.map(function (option, idx, list) { return (_jsxs("div", { onClick: function () { return handleOptionSelect(option.value); }, onMouseEnter: function () { return setHoveredOptionValue(option.value); }, onMouseLeave: function () { return setHoveredOptionValue(null); }, style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '12px 14px',
                                borderRadius: idx === list.length - 1
                                    ? '0 0 16px 16px'
                                    : idx === 0
                                        ? '16px 16px 0 0'
                                        : '0',
                                transition: 'background-color 0.2s',
                                backgroundColor: hoveredOptionValue === option.value ? '#F5F5FF' : 'transparent',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                            }, children: [_jsx("span", { style: {
                                        fontFamily: 'Suisse Intl',
                                        fontSize: 16,
                                        fontWeight: 400,
                                        color: '#101828',
                                    }, children: option.label }), value === option.value && (_jsx("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M16.6654 5L7.4987 14.1667L3.33203 10", stroke: "#0B0BCF", "stroke-width": "1.66667", "stroke-linecap": "round", "stroke-linejoin": "round" }) }))] }, option.value)); }) }), portalElement);
                };
                return (_jsxs("div", { ref: containerRef, style: __assign({ position: 'relative', width: '100%' }, style), children: [_jsxs("button", { onClick: handleToggle, style: __assign({ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '11px', borderRadius: '30px', gap: 6, cursor: 'pointer', fontSize: '16px', color: '#101828', outline: 'none', position: 'relative', height: '100%' }, ((selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.value)
                                ? {
                                    border: '1px solid #8F8FF3',
                                    background: '#F5F5FF',
                                }
                                : { background: 'white', border: '1px solid #D0D5DD' })), children: [_jsx("span", { children: (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.value) ? selectedOption.label : placeholder }), _jsx("svg", { width: "10", height: "6", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: {
                                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                                        transition: 'transform 0.2s',
                                    }, children: _jsx("path", { d: "M1 1L5 5L9 1", stroke: (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.value) ? '#8e44ad' : '#000000', strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })] }), renderDropdown()] }));
            });
        }
    };
});
System.register("CustomInput", ["react/jsx-runtime"], function (exports_4, context_4) {
    "use strict";
    var jsx_runtime_3, CustomInput;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (jsx_runtime_3_1) {
                jsx_runtime_3 = jsx_runtime_3_1;
            }
        ],
        execute: function () {
            CustomInput = function (_a) {
                var style = _a.style, placeholder = _a.placeholder, value = _a.value, onChange = _a.onChange;
                return (_jsx("input", { type: "text", style: style, placeholder: placeholder, value: value, onChange: onChange }));
            };
            exports_4("default", CustomInput);
        }
    };
});
System.register("Upload", ["react/jsx-runtime", "react", "CustomInput"], function (exports_5, context_5) {
    "use strict";
    var jsx_runtime_4, react_2, CustomInput_1, SUPPORTED_FILE_TYPES, uploadStyles, Upload, FormatError;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (jsx_runtime_4_1) {
                jsx_runtime_4 = jsx_runtime_4_1;
            },
            function (react_2_1) {
                react_2 = react_2_1;
            },
            function (CustomInput_1_1) {
                CustomInput_1 = CustomInput_1_1;
            }
        ],
        execute: function () {
            SUPPORTED_FILE_TYPES = [
                '.pdf',
                '.doc',
                '.docx',
                '.ppt',
                '.pptx',
                '.ai',
                '.txt',
            ];
            uploadStyles = {
                container: {
                    backgroundColor: '#ffffff',
                    position: 'relative',
                    borderRadius: '30px',
                    width: '100%',
                    height: '100%',
                },
                innerContainer: {
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                },
                contentBox: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    overflow: 'clip',
                    padding: '40px',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '30px',
                    border: '1px solid #D0D5DD',
                },
                sectionContainer: {
                    position: 'relative',
                    flexShrink: 0,
                    width: '100%',
                },
                sectionBox: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    padding: 0,
                    position: 'relative',
                    width: '100%',
                },
                sectionTitle: {
                    display: 'flex',
                    flexDirection: 'column',
                    fontFamily: "'Suisse Intl:Regular', sans-serif",
                    fontWeight: 'normal',
                    justifyContent: 'center',
                    lineHeight: 0,
                    minWidth: '100%',
                    fontStyle: 'normal',
                    position: 'relative',
                    flexShrink: 0,
                    color: '#000000',
                    fontSize: '24px',
                    textAlign: 'left',
                    letterSpacing: '-0.72px',
                },
                sectionTitleText: {
                    display: 'block',
                    lineHeight: 1.3,
                    fontFamily: 'Suisse Intl',
                    fontSize: '24px',
                    margin: 0,
                },
                dragDropArea: function (dragActive, invalid) {
                    return ({
                        position: 'relative',
                        flexShrink: 0,
                        width: '100%',
                        backgroundColor: dragActive ? '#f5f5ff' : 'transparent',
                        height: '200px',
                        borderRadius: '16px',
                        border: '1px dashed',
                        borderColor: invalid ? '#FDA29B' : '#8f8ff3',
                    });
                },
                dragDropContent: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                },
                dragDropBox: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    height: '200px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px',
                    position: 'relative',
                    width: '100%',
                },
                uploadText: {
                    fontFamily: "'Suisse Intl:Regular', sans-serif",
                    fontWeight: 'normal',
                    lineHeight: 0,
                    fontStyle: 'normal',
                    position: 'relative',
                    flexShrink: 0,
                    color: '#3d3de9',
                    fontSize: '14px',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                },
                uploadTextP: {
                    display: 'block',
                    lineHeight: '22px',
                    whiteSpace: 'pre',
                    margin: 0,
                },
                uploadButton: {
                    position: 'relative',
                    borderRadius: '16px',
                    boxShadow: '0px 1px 2px 0px rgba(20,21,26,0.05)',
                    flexShrink: 0,
                    backgroundColor: '#0000ff',
                    width: '100%',
                    maxWidth: 220,
                    cursor: 'pointer',
                },
                uploadButtonContainer: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'clip',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                },
                uploadButtonBox: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '4px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    paddingTop: '18px',
                    paddingBottom: '18px',
                    position: 'relative',
                    width: 'fit-content',
                },
                uploadButtonText: {
                    fontFamily: "'Suisse Intl:Book', sans-serif",
                    fontWeight: 450,
                    lineHeight: 0,
                    fontStyle: 'normal',
                    position: 'relative',
                    flexShrink: 0,
                    color: '#ffffff',
                    fontSize: '20px',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    letterSpacing: '-0.02em',
                },
                uploadButtonTextP: {
                    display: 'block',
                    lineHeight: '24px',
                    whiteSpace: 'pre',
                    margin: 0,
                },
                fileTypeText: {
                    fontFamily: "'Suisse Intl:Regular', sans-serif",
                    fontWeight: 'normal',
                    lineHeight: 0,
                    fontStyle: 'normal',
                    position: 'relative',
                    flexShrink: 0,
                    color: '#3d3de9',
                    fontSize: '14px',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                },
                fileTypeTextP: {
                    display: 'block',
                    lineHeight: '22px',
                    whiteSpace: 'pre',
                    margin: 0,
                },
                linkInput: {
                    backgroundColor: '#ffffff',
                    height: '54px',
                    position: 'relative',
                    borderRadius: '12px',
                    flexShrink: 0,
                    width: '100%',
                },
                linkInputContainer: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    overflow: 'clip',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                },
                linkInputBox: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '8px',
                    height: '54px',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingLeft: '14px',
                    paddingRight: '14px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    position: 'relative',
                    width: '100%',
                },
                linkInputField: {
                    flexBasis: 0,
                    fontFamily: "'Suisse Intl:Regular', sans-serif",
                    fontWeight: 'normal',
                    flexGrow: 1,
                    lineHeight: 0,
                    minHeight: '1px',
                    minWidth: '1px',
                    fontStyle: 'normal',
                    position: 'relative',
                    flexShrink: 0,
                    fontSize: '16px',
                    textAlign: 'left',
                    border: 'none',
                    outline: 'none',
                },
                linkInputBorder: function (invalid) {
                    return ({
                        position: 'absolute',
                        border: '1px solid',
                        borderStyle: 'solid',
                        inset: 0,
                        pointerEvents: 'none',
                        borderRadius: '12px',
                        borderColor: invalid ? '#FDA29B' : '#d0d5dd',
                    });
                },
                languageOptionsContainer: {
                    position: 'relative',
                    flexShrink: 0,
                    width: '100%',
                },
                languageOptionsBox: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '4px',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    padding: 0,
                    position: 'relative',
                    width: '100%',
                    flexWrap: 'nowrap',
                    overflow: 'auto',
                    scrollbarWidth: 'none',
                },
                languageOption: function (isSelected) {
                    return ({
                        flexBasis: 0,
                        backgroundColor: '#ffffff',
                        flexGrow: 1,
                        height: '44px',
                        minHeight: '1px',
                        // minWidth: '1px',
                        width: 140,
                        position: 'relative',
                        borderRadius: '59px',
                        flexShrink: 0,
                        cursor: 'pointer',
                        border: isSelected ? '1px solid  #8F8FF3' : '1px solid #d0d5dd',
                    });
                },
                languageOptionContainer: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                },
                languageOptionBox: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '6px',
                    height: '44px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    position: 'relative',
                    width: '100%',
                },
                languageText: {
                    fontFamily: "'Suisse Intl:Regular', sans-serif",
                    fontWeight: 'normal',
                    lineHeight: 0,
                    fontStyle: 'normal',
                    position: 'relative',
                    flexShrink: 0,
                    color: '#101828',
                    fontSize: '16px',
                    textAlign: 'left',
                    whiteSpace: 'nowrap',
                    letterSpacing: '-0.5px',
                },
                languageTextP: {
                    display: 'block',
                    lineHeight: '22px',
                    whiteSpace: 'pre',
                },
                toneSelector: {
                    position: 'relative',
                    flexShrink: 0,
                    width: '100%',
                    backgroundColor: '#ffffff',
                    height: '44px',
                    borderRadius: '59px',
                    cursor: 'pointer',
                },
                toneSelectorBorder: {
                    position: 'absolute',
                    border: '1px solid #d0d5dd',
                    borderStyle: 'solid',
                    inset: 0,
                    pointerEvents: 'none',
                    borderRadius: '59px',
                },
                toneSelectorContainer: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                },
                toneSelectorBox: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '6px',
                    height: '44px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    position: 'relative',
                    width: '100%',
                },
                toneText: {
                    fontFamily: "'Suisse Intl:Regular', sans-serif",
                    fontWeight: 'normal',
                    lineHeight: 0,
                    fontStyle: 'normal',
                    position: 'relative',
                    flexShrink: 0,
                    color: '#101828',
                    fontSize: '16px',
                    textAlign: 'left',
                    whiteSpace: 'nowrap',
                    letterSpacing: '-0.5px',
                },
                toneTextP: {
                    display: 'block',
                    lineHeight: '22px',
                    whiteSpace: 'pre',
                },
                iconContainer: {
                    position: 'relative',
                    flexShrink: 0,
                    width: '16px',
                    height: '16px',
                },
                submitButton: function (isDisabled) {
                    return ({
                        position: 'relative',
                        borderRadius: '16px',
                        boxShadow: '0px 1px 2px 0px rgba(20,21,26,0.05)',
                        flexShrink: 0,
                        width: '100%',
                        backgroundColor: isDisabled ? '#d1d1fa' : '#0000ff',
                        cursor: isDisabled ? 'default' : 'pointer',
                    });
                },
                submitButtonContainer: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'clip',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                },
                submitButtonBox: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '4px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    paddingTop: '18px',
                    paddingBottom: '18px',
                    position: 'relative',
                    width: '100%',
                },
                submitButtonText: {
                    fontFamily: "'Suisse Intl:Book', sans-serif",
                    fontWeight: 450,
                    lineHeight: 0,
                    fontStyle: 'normal',
                    position: 'relative',
                    flexShrink: 0,
                    color: '#ffffff',
                    fontSize: '20px',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    letterSpacing: '-0.4px',
                },
                submitButtonTextP: {
                    display: 'block',
                    lineHeight: '24px',
                    whiteSpace: 'pre',
                    margin: 0,
                },
                flagContainer: {
                    position: 'relative',
                    flexShrink: 0,
                    width: '24px',
                    height: '24px',
                },
                flagBox: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'clip',
                    padding: 0,
                    position: 'relative',
                    width: '24px',
                    height: '24px',
                },
                flagSize: {
                    height: '16px',
                    position: 'relative',
                    flexShrink: 0,
                    width: '22px',
                },
                flagSvg: {
                    display: 'block',
                    width: '100%',
                    height: '100%',
                },
                englishFlagContainer: {
                    overflow: 'clip',
                    position: 'relative',
                    flexShrink: 0,
                    width: '24px',
                    height: '24px',
                },
                englishFlagInner: {
                    position: 'absolute',
                    height: '16px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '22px',
                },
                // Uploaded file styles
                uploadedFileContainer: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #D0D5DD',
                    borderRadius: '16px',
                    position: 'relative',
                    flexShrink: 0,
                    width: '100%',
                    boxSizing: 'border-box',
                },
                uploadedFileContent: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    flex: 1,
                    overflow: 'hidden',
                },
                uploadedFileIcon: {
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    flexShrink: 0,
                },
                uploadedFileInfo: {
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    minWidth: 0,
                },
                uploadedFileName: {
                    fontFamily: "'Suisse Intl:Regular', sans-serif",
                    fontSize: '16px',
                    lineHeight: '22px',
                    fontWeight: 500,
                    color: '#101828',
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                },
                uploadedFileSize: {
                    fontFamily: "'Suisse Intl:Regular', sans-serif",
                    fontWeight: 'normal',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#667085',
                    margin: 0,
                },
                uploadedFileRemove: {
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    color: '#667085',
                    fontSize: '16px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    flexShrink: 0,
                    transition: 'background-color 0.15s ease',
                },
            };
            exports_5("Upload", Upload = function (_a) {
                var onChange = _a.onChange, value = _a.value, link = _a.link, setLink = _a.setLink;
                var _b = react_2.useState(false), dragActive = _b[0], setDragActive = _b[1];
                var _c = react_2.useState(false), fileError = _c[0], setFileError = _c[1];
                var _d = react_2.useState(false), linkError = _d[0], setLinkError = _d[1];
                var fileInputRef = react_2.useRef(null);
                var openFileDialog = function () {
                    if (fileInputRef.current) {
                        fileInputRef.current.click();
                    }
                };
                var handleFileChange = function (e) {
                    if (e.target.files && e.target.files[0]) {
                        var file = e.target.files[0];
                        onChange(file);
                    }
                };
                var handleDrop = function (e) {
                    var _a, _b, _c, _d;
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        var file = e.dataTransfer.files[0];
                        var type = (_b = (_a = file.type.split('/')) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : '';
                        if (type !== 'plain' &&
                            !SUPPORTED_FILE_TYPES.includes(".".concat((_d = (_c = file.type.split('/')) === null || _c === void 0 ? void 0 : _c[1]) !== null && _d !== void 0 ? _d : ''))) {
                            setFileError(true);
                            return;
                        }
                        onChange(file);
                    }
                };
                var handleDrag = function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.type === 'dragenter' || e.type === 'dragover') {
                        setDragActive(true);
                    }
                    else if (e.type === 'dragleave') {
                        setDragActive(false);
                    }
                };
                var handleRemoveFile = function () {
                    setFileError(false);
                    onChange(null);
                };
                var onLinkChange = function (e) {
                    setLinkError(false);
                    setLink(e.target.value);
                    var ext = e.target.value.split('.').pop();
                    if (!ext)
                        return;
                    if (!SUPPORTED_FILE_TYPES.includes(ext)) {
                        setLinkError(true);
                    }
                };
                if (value) {
                    return (_jsx("div", { style: uploadStyles.sectionContainer, children: _jsxs("div", { style: uploadStyles.sectionBox, children: [_jsx("div", { style: uploadStyles.sectionTitle, children: _jsx("p", { style: uploadStyles.sectionTitleText, children: "Upload file" }) }), _jsxs("div", { style: uploadStyles.uploadedFileContainer, children: [_jsxs("div", { style: uploadStyles.uploadedFileContent, children: [_jsx("div", { style: uploadStyles.uploadedFileIcon, children: _jsxs("svg", { width: "36", height: "36", viewBox: "0 0 36 36", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("circle", { cx: "18", cy: "18", r: "18", fill: "#F5F5FF" }), _jsx("circle", { cx: "18", cy: "18", r: "14", fill: "#E7E7FC" }), _jsx("path", { d: "M19.3337 11.5126V14.2663C19.3337 14.6397 19.3337 14.8264 19.4063 14.969C19.4702 15.0944 19.5722 15.1964 19.6977 15.2603C19.8403 15.333 20.027 15.333 20.4003 15.333H23.154M23.3337 16.6585V21.4663C23.3337 22.5864 23.3337 23.1465 23.1157 23.5743C22.9239 23.9506 22.618 24.2566 22.2416 24.4484C21.8138 24.6663 21.2538 24.6663 20.1337 24.6663H15.867C14.7469 24.6663 14.1868 24.6663 13.759 24.4484C13.3827 24.2566 13.0767 23.9506 12.885 23.5743C12.667 23.1465 12.667 22.5864 12.667 21.4663V14.533C12.667 13.4129 12.667 12.8529 12.885 12.425C13.0767 12.0487 13.3827 11.7427 13.759 11.551C14.1868 11.333 14.7469 11.333 15.867 11.333H18.0082C18.4974 11.333 18.7419 11.333 18.9721 11.3883C19.1762 11.4373 19.3713 11.5181 19.5502 11.6277C19.7521 11.7514 19.925 11.9244 20.2709 12.2703L22.3964 14.3957C22.7423 14.7417 22.9153 14.9146 23.0389 15.1164C23.1486 15.2954 23.2294 15.4905 23.2784 15.6945C23.3337 15.9247 23.3337 16.1693 23.3337 16.6585Z", stroke: "#0B0BCF", "stroke-width": "1.33", "stroke-linecap": "round", "stroke-linejoin": "round" })] }) }), _jsxs("div", { style: uploadStyles.uploadedFileInfo, children: [_jsx("p", { style: uploadStyles.uploadedFileName, children: value.name }), _jsx("p", { style: uploadStyles.uploadedFileSize, children: "Uploaded" })] })] }), _jsx("button", { onClick: handleRemoveFile, style: uploadStyles.uploadedFileRemove, title: "Remove file", children: _jsx("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M13.3333 5.00033V4.33366C13.3333 3.40024 13.3333 2.93353 13.1517 2.57701C12.9919 2.2634 12.7369 2.00844 12.4233 1.84865C12.0668 1.66699 11.6001 1.66699 10.6667 1.66699H9.33333C8.39991 1.66699 7.9332 1.66699 7.57668 1.84865C7.26308 2.00844 7.00811 2.2634 6.84832 2.57701C6.66667 2.93353 6.66667 3.40024 6.66667 4.33366V5.00033M8.33333 9.58366V13.7503M11.6667 9.58366V13.7503M2.5 5.00033H17.5M15.8333 5.00033V14.3337C15.8333 15.7338 15.8333 16.4339 15.5608 16.9686C15.3212 17.439 14.9387 17.8215 14.4683 18.0612C13.9335 18.3337 13.2335 18.3337 11.8333 18.3337H8.16667C6.76654 18.3337 6.06647 18.3337 5.53169 18.0612C5.06129 17.8215 4.67883 17.439 4.43915 16.9686C4.16667 16.4339 4.16667 15.7338 4.16667 14.3337V5.00033", stroke: "#667085", "stroke-width": "1.66667", "stroke-linecap": "round", "stroke-linejoin": "round" }) }) })] })] }) }));
                }
                return (_jsx("div", { style: uploadStyles.sectionContainer, children: _jsxs("div", { style: uploadStyles.sectionBox, children: [_jsx("div", { style: uploadStyles.sectionTitle, children: _jsx("p", { style: uploadStyles.sectionTitleText, children: "Upload file" }) }), _jsxs("div", { style: { width: '100%' }, children: [_jsx("div", { style: uploadStyles.dragDropArea(dragActive, fileError), onDragEnter: handleDrag, onDragLeave: handleDrag, onDragOver: handleDrag, onDrop: handleDrop, children: _jsx("div", { style: uploadStyles.dragDropContent, children: _jsxs("div", { style: uploadStyles.dragDropBox, children: [_jsx("div", { style: uploadStyles.uploadText, children: _jsx("p", { style: uploadStyles.uploadTextP, children: "Upload a file up to 100MB" }) }), _jsxs("div", { style: uploadStyles.uploadButton, onClick: openFileDialog, children: [_jsx("input", { type: "file", ref: fileInputRef, onChange: handleFileChange, style: { display: 'none' }, accept: ".pdf,.doc,.docx,.ppt,.pptx,.ai,.txt" }), _jsx("div", { style: uploadStyles.uploadButtonContainer, children: _jsx("div", { style: uploadStyles.uploadButtonBox, children: _jsx("div", { style: uploadStyles.uploadButtonText, children: _jsx("p", { style: uploadStyles.uploadButtonTextP, children: "Upload a file" }) }) }) })] }), _jsx("div", { style: uploadStyles.fileTypeText, children: _jsx("p", { style: uploadStyles.fileTypeTextP, children: "PDF, DOC, DOCX, PPT, PPTX, AI." }) })] }) }) }), fileError && _jsx(FormatError, {})] }), _jsxs("div", { style: uploadStyles.linkInput, children: [_jsx("div", { style: uploadStyles.linkInputContainer, children: _jsx("div", { style: uploadStyles.linkInputBox, children: _jsx(CustomInput_1.default, { style: uploadStyles.linkInputField, placeholder: "or Paste a link", value: link, onChange: onLinkChange }) }) }), _jsx("div", { style: uploadStyles.linkInputBorder(linkError) }), linkError && _jsx(FormatError, {})] })] }) }));
            });
            FormatError = function () { return (_jsx("p", { style: {
                    color: '#D92D20',
                    fontFamily: 'Suisse Intl',
                    fontSize: 14,
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '20px',
                }, children: "File type not supported. Please upload one of the following types: PDF, DOC, DOCX, PPT, PPTX, AI." })); };
        }
    };
});
System.register("lib/others", ["react/jsx-runtime", "../svg/flags"], function (exports_6, context_6) {
    "use strict";
    var jsx_runtime_5, flags_1, flags_2, flags_3, flags_4, OTHERS;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (jsx_runtime_5_1) {
                jsx_runtime_5 = jsx_runtime_5_1;
            },
            function (flags_1_1) {
                flags_1 = flags_1_1;
                flags_2 = flags_1_1;
                flags_3 = flags_1_1;
                flags_4 = flags_1_1;
            }
        ],
        execute: function () {
            exports_6("OTHERS", OTHERS = [
                {
                    label: (_jsxs("div", { style: {
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                        }, children: [_jsx(flags_1.GreekFlag, {}), _jsx("p", { style: { margin: 0 }, children: "Greek" })] })),
                    value: 'EL',
                },
                {
                    label: (_jsxs("div", { style: {
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                        }, children: [_jsx(flags_3.NorwegianFlag, {}), _jsx("p", { style: { margin: 0 }, children: "Norwegian" })] })),
                    value: 'NB',
                },
                {
                    label: (_jsxs("div", { style: {
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                        }, children: [_jsx(flags_4.TurkishFlag, {}), _jsx("p", { style: { margin: 0 }, children: "Turkish" })] })),
                    value: 'TR',
                },
                {
                    label: (_jsxs("div", { style: {
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                        }, children: [_jsx(flags_2.IsralianFlag, {}), _jsx("p", { style: { margin: 0 }, children: "Hebrew" })] })),
                    value: 'HE',
                },
            ]);
        }
    };
});
System.register("Form", ["react/jsx-runtime", "react", "LanguageOption", "./svg/flags", "styles", "Select", "Upload", "lib/others", "./Card", "./LoadingCard", "./Button", "./ResponseCard"], function (exports_7, context_7) {
    "use strict";
    var jsx_runtime_6, react_3, LanguageOption_1, flags_5, styles_1, Select_1, Upload_1, others_1, Card_1, LoadingCard_1, Button_1, ResponseCard_1;
    var __moduleName = context_7 && context_7.id;
    function FormComponent() {
        var _this = this;
        var _a = react_3.useState(null), selectedFile = _a[0], setSelectedFile = _a[1];
        var _b = react_3.useState(''), link = _b[0], setLink = _b[1];
        var _c = react_3.useState('EN-GB'), selectedLanguage = _c[0], setSelectedLanguage = _c[1];
        var _d = react_3.useState(null), tone = _d[0], setTone = _d[1];
        var _e = react_3.useState(false), isLoading = _e[0], setIsLoading = _e[1];
        var _f = react_3.useState(null), response = _f[0], setResponse = _f[1];
        // Handle form submission
        var handleSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!selectedFile && !link) {
                            return [2 /*return*/];
                        }
                        setIsLoading(true);
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5000); })];
                    case 1:
                        _a.sent();
                        setIsLoading(false);
                        setResponse(selectedFile);
                        return [2 /*return*/];
                }
            });
        }); };
        var translateAnother = function () {
            setSelectedFile(null);
            setLink('');
            setTone(null);
            setResponse(null);
        };
        if (isLoading)
            return _jsx(LoadingCard_1.LoadingCard, {});
        if (response)
            return _jsx(ResponseCard_1.ResponseCard, { file: response, translateAnother: translateAnother });
        return (_jsxs(Card_1.Card, { children: [_jsx(Upload_1.Upload, { onChange: setSelectedFile, value: selectedFile, link: link, setLink: setLink }), _jsx("div", { style: styles_1.default.sectionContainer, children: _jsxs("div", { style: styles_1.default.sectionBox, children: [_jsx("div", { style: styles_1.default.sectionTitle, children: _jsx("p", { style: styles_1.default.sectionTitleText, children: "Translate to" }) }), _jsx("div", { style: styles_1.default.languageOptionsContainer, children: _jsxs("div", { style: styles_1.default.languageOptionsBox, children: [_jsx(LanguageOption_1.default, { language: "German", flag: _jsx(flags_5.GermanFlag, {}), isSelected: selectedLanguage === 'DE', onClick: function () { return setSelectedLanguage('DE'); } }), _jsx(LanguageOption_1.default, { language: "French", flag: _jsx(flags_5.FrenchFlag, {}), isSelected: selectedLanguage === 'FR', onClick: function () { return setSelectedLanguage('FR'); } }), _jsx(LanguageOption_1.default, { language: "English", flag: _jsx(flags_5.EnglishFlag, {}), isSelected: selectedLanguage === 'EN-GB', onClick: function () { return setSelectedLanguage('EN-GB'); } }), _jsx(LanguageOption_1.default, { language: "Spanish", flag: _jsx(flags_5.SpanishFlag, {}), isSelected: selectedLanguage === 'ES', onClick: function () { return setSelectedLanguage('ES'); } }), _jsx(Select_1.Select, { placeholder: "Other", options: others_1.OTHERS, value: selectedLanguage, onChange: function (v) { return setSelectedLanguage(v); }, style: { width: 'auto', flex: 1 } })] }) }), _jsx(Select_1.Select, { onChange: setTone, options: [
                                    { label: 'Not specified', value: null },
                                    { label: 'Informal', value: 'prefer_less' },
                                    { label: 'Formal', value: 'prefer_more' },
                                ], placeholder: "Select tone", value: tone })] }) }), _jsx(Button_1.Button, { disabled: isLoading || (!selectedFile && !link), size: "large", onClick: handleSubmit, children: isLoading ? 'Translating...' : 'Translate' }), _jsx("div", { id: "portal" })] }));
    }
    function Form() {
        return (_jsxs("div", { className: "__entry", children: [_jsx("style", { children: "\n        .__entry * {\n          box-sizing: border-box;\n          margin: 0;\n          padding: 0;\n          font-family: 'Suisse Intl';\n        }\n      " }), _jsx(FormComponent, {})] }));
    }
    exports_7("default", Form);
    return {
        setters: [
            function (jsx_runtime_6_1) {
                jsx_runtime_6 = jsx_runtime_6_1;
            },
            function (react_3_1) {
                react_3 = react_3_1;
            },
            function (LanguageOption_1_1) {
                LanguageOption_1 = LanguageOption_1_1;
            },
            function (flags_5_1) {
                flags_5 = flags_5_1;
            },
            function (styles_1_1) {
                styles_1 = styles_1_1;
            },
            function (Select_1_1) {
                Select_1 = Select_1_1;
            },
            function (Upload_1_1) {
                Upload_1 = Upload_1_1;
            },
            function (others_1_1) {
                others_1 = others_1_1;
            },
            function (Card_1_1) {
                Card_1 = Card_1_1;
            },
            function (LoadingCard_1_1) {
                LoadingCard_1 = LoadingCard_1_1;
            },
            function (Button_1_1) {
                Button_1 = Button_1_1;
            },
            function (ResponseCard_1_1) {
                ResponseCard_1 = ResponseCard_1_1;
            }
        ],
        execute: function () {
        }
    };
});
