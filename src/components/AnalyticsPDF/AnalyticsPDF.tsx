import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'

type AnalyticsPDFProps = {
  dataType: 'visits' | 'events' | 'navigation'
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

const AnalyticsPDF = ({ dataType }: AnalyticsPDFProps) => {
  return (
    <Document
      title={`Analytics data, ${dataType} - ${format(new Date(), 'dd/MM/yyyy HH:mm')}`}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{dataType}</Text>
        </View>
      </Page>
    </Document>
  )
}

export default AnalyticsPDF
