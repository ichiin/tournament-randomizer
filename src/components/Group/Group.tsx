import { Label, ListRow } from 'components'

import { PlayerType } from 'utils/types'
import styled from '@emotion/styled'

const GroupContainer = styled.div``

const GroupPlayersContainer = styled.div`
    column-gap: 24px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const LabelContainer = styled.div`
    margin-bottom: 8px;
`

const ListCell = styled.div`
    width: 300px;
`

interface GroupProps {
    items: PlayerType[]
    label: string
}

const Group = ({ items, label }: GroupProps) => {
    return (
        <GroupContainer>
            {label && (
                <LabelContainer>
                    <Label>{label}</Label>
                </LabelContainer>
            )}
            <GroupPlayersContainer>
                {items.map((item) => {
                    const { avatar, isSeeded, name } = item
                    return (
                        <ListCell>
                            <ListRow
                                avatar={avatar}
                                name={name}
                                isSeeded={isSeeded}
                            />
                            ;
                        </ListCell>
                    )
                })}
            </GroupPlayersContainer>
        </GroupContainer>
    )
}

export default Group
