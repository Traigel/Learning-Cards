import React, {useState} from 'react'
import SuperInputText from "../../common/superInputText/SuperInputText";
import SuperButton from "../../common/superButton/SuperButton";
import SuperCheckbox from "../../common/superCheckbox/SuperCheckbox";
import SuperEditableSpan from "../../common/superEditableSpan/SuperEditableSpan";
import SuperSelect from "../../common/superSelect/SuperSelect";
import SuperRadio from "../../common/superRadio/SuperRadio";

export const TestComponent = () => {

    const arr = ['x', 'y', 'z']

    const [text, setText] = useState<string>('')
    const [value, setValue] = useState(arr[1])

    const error = text ? '' : 'error'

    return (
        <div>
            TestComponent:
            <div>
                <SuperInputText
                    value={text}
                    onChangeText={setText}
                    error={error}
                />
            </div>
            <div>
                <SuperButton>Button</SuperButton>
            </div>
            <div>
                <SuperCheckbox/>
            </div>
            <div>
                <SuperEditableSpan
                    value={text}
                    onChangeText={setText}
                    spanProps={{children: text ? undefined : 'enter text...'}}
                />
            </div>
            <div>
                <SuperSelect
                    options={arr}
                    value={value}
                    onChangeOption={setValue}
                />
                <SuperRadio
                    options={arr}
                    value={value}
                    onChangeOption={setValue}
                />
            </div>
        </div>
    )
}