import React from 'react'
import { Options } from '../../App'

export function Select({ options, sortPostList }:any) {
    return (
        <div>
            <select defaultValue='defaultValue' onChange={(event) => sortPostList(event?.target.value)}>
                <option value='defaultValue' disabled={true} >Сортировка</option>
                {
                options.map((element: Options, index: number) =>
                <option key={index} value={element.value}>{element.name}</option>
                )}
            </select>
        </div>
    )
}
