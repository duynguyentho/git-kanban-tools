const processBodyData = (data: any): string => {
    const event = data.object_kind;
    const payload = handleDescriptionMergeRequest(data?.object_attributes?.description);
    console.log(payload);
    return data.object_kind;
};

const handleDescriptionMergeRequest = (inputString: string): RegExpMatchArray | null => {
    const regex = /https?:\/\/\S+/g;
    return <RegExpMatchArray>inputString.match(regex);
};

export { processBodyData };
