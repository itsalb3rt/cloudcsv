import i18n from '@/i18n'

export default {
    namespaced: true,
    state: {
        csvDelimiters: [{
                text: i18n.t('dataPanel.automatic'),
                value: 'auto'
            },
            {
                text: i18n.t('dataPanel.comma'),
                value: ','
            },
            {
                text: i18n.t('dataPanel.semicolon'),
                value: ';'
            },
            {
                text: i18n.t('dataPanel.tabulation'),
                value: '    '
            },
            {
                text: i18n.t('dataPanel.pipe'),
                value: '|'
            },
        ]
    },
}