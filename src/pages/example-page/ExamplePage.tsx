import React, {useState, useEffect, useContext} from "react";
import styled from 'styled-components'
import {observer} from 'mobx-react'
import {useExampleStore} from "./ExampleStore.tsx";

const Container = styled.div`
    display: grid;
    
`

export interface ExamplePageProps {

}

export const ExamplePage = observer((props: ExamplePageProps) => {
    let store = useExampleStore()
    let logic = store.exampleLogic;
    return <Container>
        Example Page
        {JSON.stringify(logic.getExampleData(), null , 2)}
    </Container>
})
