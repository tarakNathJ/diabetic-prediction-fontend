

// to gate the data..
export const LoadState = (key:string, defaultValue :any) => {
    try {
        const SerializedState = sessionStorage.getItem(key);
        if (SerializedState === null) {
            return defaultValue;
        }

        return JSON.parse(SerializedState);
    } catch (error) {
        return defaultValue;
    }
};

// to set The data.. .

export const StoreData = (key:string, Obj :any) => {
    try {
    sessionStorage.setItem(key,JSON.stringify(Obj));
    } catch (error) {
    }

}

export const RemoveData = (key:string) => {
    try {
    sessionStorage.setItem(key,JSON.stringify([]));
    } catch (error) {
    }

}
