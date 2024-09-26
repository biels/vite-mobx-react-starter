import React, {useState, useEffect, useContext} from "react";
import styled from 'styled-components'
import {observer} from 'mobx-react'
import {useScheduleTestStore} from "./ScheduleTestStore.tsx";

const Container = styled.div`
    display: grid;
    
`

export interface ScheduleTestProps {

}

export const ScheduleTest = observer((props: ScheduleTestProps) => {
    let store = useScheduleTestStore()
    let sim = store.sim;
    return <Container>
        Sim
        {JSON.stringify(sim.getAllTasks(), null , 2)}
    </Container>
})
