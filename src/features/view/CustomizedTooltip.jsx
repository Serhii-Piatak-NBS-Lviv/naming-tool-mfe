import { css } from "@emotion/css";

const CustomizedTooltip = ({parentRef, isShow=true}) => {
    const cssCopiedTooltip = css`
        position: absolute;
        background-color: #2D3748;
        color: #FFF;
        margin-top: ${parentRef?.clientHeight + 5}px;
        width: 160px;
        text-align: center;
        font-weight: 600;
        font-size: 14px;
        padding: 3px 0;
        border-radius: 2px;
        opacity: ${isShow ? 1 : 0};
        transition: all 0.75s ease;

        &::after {
            position: relative;
            top: -24px;
            left: -62px;
            border-top: 5px solid transparent;
            border-bottom: 5px solid #2D3748;
            border-right: 5px solid transparent;
            border-left: 5px solid transparent;
            content: "";
            font-size: 0;
            line-height: 0;
            margin-left: -5px;
            width: 0;
        }
    `;
    return (
        <div className={cssCopiedTooltip}>Copied to clipboard!</div>
    )
};

export default CustomizedTooltip;