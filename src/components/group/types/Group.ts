export type permissions = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES'

export type GroupType = {
    id: string,
    name: string,
    permissions: Array<permissions>,
}
