import { colors, typography } from 'utils/colors'

import { Label } from 'components'
import styled from '@emotion/styled'

const Input = styled.textarea`
    border: 3px solid ${colors.niceBlue};
    border-radius: 8px;
    box-shadow: none;
    font-size: ${typography.label.fontSize};
    font-weight: ${typography.label.fontWeight};
    height: 30px;
    outline: none;
    padding: 12px 8px;
    resize: none;
`

const LabelContainer = styled.div`
    margin-bottom: 8px;
`

const TextInputContainer = styled.div`
    display: flex;
    flex-direction: column;
`

interface TextInputProps {
    label?: string
    onChange: Function
    value: string
}

const TextInput = ({ label, onChange, value }: TextInputProps) => {
    return (
        <TextInputContainer>
            {label && (
                <LabelContainer>
                    <Label>{label}</Label>
                </LabelContainer>
            )}
            <Input
                onChange={(event) => onChange(event.target.value)}
                value={value}
            />
        </TextInputContainer>
    )
}

export default TextInput
