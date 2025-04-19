import { useState } from "react";

export default function Page({title, content}) {
    console.log(title)
    return (
        <div>
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
    )
}