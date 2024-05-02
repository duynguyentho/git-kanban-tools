import {addJob, jobQueue} from "../utils/queue";

const processBodyData = (data: any): string => {
    const payload = handleDescriptionMergeRequest(data?.object_attributes?.description);

    if (payload) {
        const issueKeys = getIssueKeys(payload);

        issueKeys.forEach(issueKey => {
            addJob({
                type: 'updateTask',
                payload: {
                    issueKey: issueKey,
                    action: data?.object_attributes?.action,
                    payload: data
                }
            })
        })
    }
    return data?.object_attributes?.action;
};

const handleDescriptionMergeRequest = (inputString: string): RegExpMatchArray | null => {
    const regex = /https?:\/\/\S+/g;
    return <RegExpMatchArray>inputString.match(regex);
};

const getIssueKeys = (content: string[]) => {
    const regex = /TEST-\d+/g;
    return content.map((url: string) => {
        // @ts-ignore
        return url.match(regex) ? url.match(regex)[0] : null
    })
}

const stringToMarkdown = (inputString: string): string  => {
    inputString = inputString
        // .replace(/\*/g, '\\*')
        .replace(/\n/g, '<br>')
    ;

    return `*${inputString}*`;
}

const getIssue = (payload: any): string => {
    return '';
}

export { processBodyData, stringToMarkdown };
