import React, {DetailedHTMLProps, InputHTMLAttributes, HTMLAttributes, useState} from 'react'
import SuperInputText from '../superInputText/SuperInputText'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
// тип пропсов обычного спана
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperEditableSpanType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    spanProps?: DefaultSpanPropsType // пропсы для спана
    spanValue?: string
    inputValue?: string
}

const SuperEditableSpan: React.FC<SuperEditableSpanType> = (
    {
        inputValue,
        autoFocus, // игнорировать изменение этого пропса
        onBlur,
        onEnter,
        spanProps,
        spanValue,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {}

    const onEnterCallback = () => {
        setEditMode(false) // выключить editMode при нажатии Enter

        onEnter && onEnter()
    }
    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false) // выключить editMode при нажатии за пределами инпута

        onBlur && onBlur(e)
    }
    const onClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true) // включить editMode при двойном клике

        onDoubleClick && onDoubleClick(e)
    }

    return (
        <>
            {editMode
                ? (
                    <SuperInputText
                        autoFocus // пропсу с булевым значением не обязательно указывать true
                        onBlur={onBlurCallback}
                        onEnter={onEnterCallback}
                        value={inputValue}

                        {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                    />
                ) : (
                    <span
                        onClick={onClickCallBack}
                        className={restProps.spanClassName}
                        {...restSpanProps}
                    >
                        {/*если нет захардкодженного текста для спана, то значение инпута*/}
                        {children || restProps.value || spanValue}
                        <span><svg width="35px" height="33px" viewBox="0 -0.08 20 20" data-name="Capa 1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"><path d="M15.51,14.21,12,11.85,13.6,9.49a.38.38,0,0,0-.34-.58l-5,.38A.37.37,0,0,0,8,9.45a.36.36,0,0,0-.05.33l1.56,4.79a.37.37,0,0,0,.3.26h.05a.34.34,0,0,0,.31-.17l1.47-2.19,3.48,2.36a.36.36,0,0,0,.2.06.4.4,0,0,0,.32-.16A.37.37,0,0,0,15.51,14.21ZM10,13.6,8.79,10l3.76-.28Z"/><path d="M6.46,11.18l-1.62.24a.37.37,0,0,0-.32.42.38.38,0,0,0,.37.32h.05l1.62-.23a.38.38,0,0,0,.32-.43A.38.38,0,0,0,6.46,11.18Z"/><path d="M6.1,8.41a.36.36,0,0,0,.32-.18.38.38,0,0,0-.13-.52l-1.4-.83A.38.38,0,0,0,4.37,7a.38.38,0,0,0,.13.51l1.41.84A.45.45,0,0,0,6.1,8.41Z"/><path d="M9.19,7a.36.36,0,0,0,.36.29h.08a.37.37,0,0,0,.29-.45l-.34-1.6A.38.38,0,0,0,9.14,5a.38.38,0,0,0-.29.45Z"/></svg></span>
                    </span>
                )
            }
        </>
    )
}

export default SuperEditableSpan
