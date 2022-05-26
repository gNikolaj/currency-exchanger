import {currencies} from "../utils/consts";

interface Currency {
    currentValue: number;
    updateCurrentValue: any;
    changeCurrentCurrency: any;
}

const EnterCurrency = ({currentValue, updateCurrentValue, changeCurrentCurrency}: Currency) => {
    const checkKeyForNumber = (e: any) => {
        e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');
    }

    const exchangeCurrency = (e: any) => {
        updateCurrentValue(e.target.value);
    }

    const changeOption = (e: any) => {
        changeCurrentCurrency(e.target.value.toLowerCase());
    }

    return (
        <div className="enter-currency-box">
            <div className="input-box">
                <input type="text"
                       onInputCapture={checkKeyForNumber}
                       value={currentValue}
                       onInput={(e) => {
                           exchangeCurrency(e)
                       }}
                />
            </div>
            <div className="select-box">
                <select name="currency" onChange={(e) => {
                    changeOption(e)
                }}>
                    {
                        currencies.map((item) => (
                            <option data-symbol={item.label} data-placeholder="0.00" key={item.id}>{item.value}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
};

export default EnterCurrency;
