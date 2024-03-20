import React from 'react'

function NoMeta() {
    function checkMetamaskInstalled() {

            if (typeof window.ethereum !== 'undefined') {
                return true;
            }
            return false;
    }
    return (
        !checkMetamaskInstalled() &&
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-3">
            <div className="flex justify-between  p-3">
                <div className="text-xl md:text-3xl px-4 text-red-500">Install Metamask to use this application</div>
                <div></div>
            </div></div>
    )
}

export default NoMeta