import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Document, Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { createInitialAgreementSnapshot, type AgreementSnapshot } from "./snapshot";

const fontDir = join(process.cwd(), "src", "lib", "commercial-documents", "fonts");
const logo = readFileSync(join(process.cwd(), "public", "logo-light.png"));
Font.register({
  family: "Inter",
  fonts: [
    { src: join(fontDir, "Inter-Regular.woff"), fontWeight: 400 },
    { src: join(fontDir, "Inter-Bold.woff"), fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: { width: 595.28, height: 841.89, paddingTop: 25, paddingBottom: 22, paddingHorizontal: 54, fontFamily: "Inter", fontSize: 9.7, lineHeight: 1.33, color: "#263244", backgroundColor: "#fff" },
  shell: { flexGrow: 1, flexDirection: "column" },
  header: { marginBottom: 15, paddingBottom: 8, borderBottomWidth: 0.8, borderBottomColor: "#dbe2eb", flexDirection: "row", justifyContent: "space-between", alignItems: "center", color: "#42516a", fontSize: 8 },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  brandLogo: { width: 22, height: 27 },
  body: { flexGrow: 1 },
  footer: { marginTop: 14, paddingTop: 8, borderTopWidth: 0.8, borderTopColor: "#dbe2eb", flexDirection: "row", justifyContent: "space-between", color: "#64748b", fontSize: 8 },
  brand: { fontSize: 8, fontWeight: 700, letterSpacing: 1.2, color: "#122344" },
  eyebrow: { fontSize: 8, fontWeight: 700, letterSpacing: 1.5, color: "#315ad3" },
  title: { marginTop: 8, fontSize: 22, lineHeight: 1.15, fontWeight: 700, color: "#101a2e" },
  parties: { marginTop: 7, color: "#5b6b84", fontSize: 10 },
  banner: { marginTop: 15, padding: 9, borderWidth: 1, borderColor: "#80b99a", backgroundColor: "#f0f8f4", borderRadius: 5, color: "#15583a", fontSize: 9, fontWeight: 700 },
  intro: { marginTop: 9, marginBottom: 8, color: "#55657b" },
  heading: { marginTop: 15, marginBottom: 7, paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: "#dce3ed", fontSize: 12, fontWeight: 700, color: "#111c33" },
  smallHeading: { marginBottom: 5, fontSize: 9, fontWeight: 700, color: "#233755" },
  box: { padding: 9, borderWidth: 0.8, borderColor: "#dce3ed", borderRadius: 5 },
  partyGrid: { flexDirection: "row", gap: 9, marginTop: 3 },
  partyColumn: { flex: 1, gap: 3 },
  label: { fontSize: 7.5, color: "#64748b" },
  value: { marginBottom: 3, fontSize: 8.3, color: "#1d293b" },
  agreed: { padding: 9, backgroundColor: "#f0f8f4", borderWidth: 0.8, borderColor: "#bbdfca", borderRadius: 5 },
  agreedLine: { marginBottom: 3, fontSize: 8.3, color: "#234c36" },
  clause: { marginTop: 8 },
  clauseHeading: { marginBottom: 4, fontSize: 10.2, fontWeight: 700, color: "#14213a" },
  paragraph: { marginBottom: 3.5 },
  listItem: { marginLeft: 12, marginBottom: 2.5, paddingLeft: 2 },
  example: { marginTop: 3, marginBottom: 6, padding: 8, backgroundColor: "#f1f6ff", borderRadius: 4 },
  exampleTitle: { marginBottom: 3, fontSize: 8, fontWeight: 700, color: "#315ad3" },
  signingHelp: { padding: 9, borderWidth: 0.8, borderColor: "#dce3ed", backgroundColor: "#f8fafd", borderRadius: 4, fontSize: 8.3, color: "#475569" },
  signatureGrid: { flexDirection: "row", gap: 10, marginTop: 9 },
  signatureBox: { flex: 1, padding: 10, borderWidth: 0.9, borderColor: "#b8c7dc", borderRadius: 5, backgroundColor: "#fff" },
  signatureTitle: { marginBottom: 5, fontSize: 9.2, fontWeight: 700, color: "#15243c" },
  signatureText: { marginBottom: 3, fontSize: 7.8, color: "#334155" },
  signLine: { height: 21, marginTop: 10, borderBottomWidth: 0.8, borderBottomColor: "#64748b" },
  signLabel: { marginTop: 3, fontSize: 7.2, color: "#64748b" },
  signatureImage: { width: 130, height: 28, marginTop: 7, objectFit: "contain" },
  signatureMeta: { marginTop: 2, fontSize: 7, color: "#475569" },
  hash: { marginTop: 5, fontSize: 5.8, color: "#64748b" },
});

export type AgreementExecutionRecord = {
  signerName: string;
  signerTitle: string;
  signatureData: string;
  signedAt: string;
  termsHash: string;
};

function PdfBlock({ block }: { block: AgreementSnapshot["clauses"][number]["blocks"][number] }) {
  if (block.type === "list") return <View>{block.items.map((item) => <Text key={item} style={styles.listItem}>•  {item}</Text>)}</View>;
  if (block.type === "example") return <View style={styles.example} wrap={false}><Text style={styles.exampleTitle}>{block.title.toUpperCase()}</Text><Text>{block.text}</Text></View>;
  return <Text style={styles.paragraph}>{block.text}</Text>;
}

function PdfPage({ snapshot, children }: {
  snapshot: AgreementSnapshot;
  children: React.ReactNode;
}) {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.shell}>
        <View fixed style={styles.header}><View style={styles.brandRow}><Image src={logo} style={styles.brandLogo} /><Text style={styles.brand}>MELHEK TECHNOLOGIES</Text></View></View>
        <View style={styles.body}>{children}</View>
        <View fixed style={styles.footer}><Text>REFERRAL PARTNERSHIP AGREEMENT</Text><Text>MELHEK TECHNOLOGIES</Text></View>
      </View>
    </Page>
  );
}

function ClauseView({ clause }: { clause: AgreementSnapshot["clauses"][number] }) {
  return (
    <View key={clause.id} style={styles.clause}>
      <Text style={styles.clauseHeading}>{String(clause.number).padStart(2, "0")}  {clause.title}</Text>
      {clause.blocks.map((block, index) => <PdfBlock key={`${clause.id}-${index}`} block={block} />)}
    </View>
  );
}

function Signatures({ snapshot, execution }: { snapshot: AgreementSnapshot; execution?: AgreementExecutionRecord }) {
  return (
    <View>
      <Text style={styles.heading}>Signatures</Text>
      <Text style={styles.signingHelp}>{execution ? "This copy records Party B’s electronic signature. Party A must also sign before this Agreement takes effect. The signature method shown here is not represented as a certificate-based or qualified digital signature." : "Each Party may sign this PDF or print and sign a paper copy, then exchange the signed copies through a communication channel they mutually agree to use. This Agreement takes effect on the date of the last signature."}</Text>
      <View style={styles.signatureGrid}>
        {snapshot.parties.map((party) => (
          <View key={party.label} style={styles.signatureBox}>
            <Text style={styles.signatureTitle}>For {party.tradingName}</Text>
            <Text style={styles.signatureText}>Representative: {party.label === "Party B" && execution ? execution.signerName : party.representative}</Text>
            <Text style={styles.signatureText}>Title: {party.label === "Party B" && execution ? execution.signerTitle : party.position}</Text>
            {party.label === "Party B" && execution ? (
              <>
                <Image src={execution.signatureData} style={styles.signatureImage} />
                <Text style={styles.signLabel}>Hand-drawn electronic signature</Text>
                <Text style={styles.signatureMeta}>{execution.signedAt} UTC</Text>
              </>
            ) : (
              <><View style={styles.signLine} /><Text style={styles.signLabel}>Signature</Text><View style={styles.signLine} /><Text style={styles.signLabel}>Date</Text></>
            )}
          </View>
        ))}
      </View>
      {execution && <Text style={styles.hash}>AGREEMENT TERMS SHA-256: {execution.termsHash}</Text>}
    </View>
  );
}

export default function AgreementSignaturePDF({ snapshot = createInitialAgreementSnapshot(), execution }: { snapshot?: AgreementSnapshot; execution?: AgreementExecutionRecord }) {
  const clauseGroups = [
    snapshot.clauses.slice(0, 4),
    snapshot.clauses.slice(4, 6),
    snapshot.clauses.slice(6, 10),
    snapshot.clauses.slice(10, 15),
    snapshot.clauses.slice(15, 19),
  ];

  return (
    <Document title={snapshot.title + " · Signature Copy"} author="Melhek Technologies" subject="Melhek Technologies and Kenenét Consultancy" language="en">
      <PdfPage snapshot={snapshot}>
        <Text style={styles.eyebrow}>NON-EXCLUSIVE REFERRAL ARRANGEMENT</Text>
        <Text style={styles.title}>{snapshot.title}</Text>
        <Text style={styles.parties}>{snapshot.parties.map((party) => party.tradingName).join("  ·  ")}</Text>
        <Text style={styles.banner}>{execution ? "PARTY B SIGNED · PARTY A COUNTERSIGNATURE REQUIRED" : "READY FOR SIGNATURE"}</Text>
        <Text style={styles.intro}>{execution ? "This PDF includes Party B’s signature record. Party A must also sign before the Agreement takes effect." : "Please review the complete agreement, sign the execution page, and return the signed copy through a communication channel mutually agreed by the Parties."}</Text>

        <Text style={styles.heading}>The Parties</Text>
        <View style={styles.partyGrid}>
          {snapshot.parties.map((party) => (
            <View key={party.label} style={[styles.box, styles.partyColumn]}>
              <Text style={styles.smallHeading}>{party.label} - {party.tradingName}</Text>
              <Text style={styles.label}>Party / business name</Text><Text style={styles.value}>{party.legalName}</Text>
              <Text style={styles.label}>Business capacity</Text><Text style={styles.value}>{party.legalForm}</Text>
              <Text style={styles.label}>Location</Text><Text style={styles.value}>{party.address}</Text>
              <Text style={styles.label}>Representative / title</Text><Text style={styles.value}>{party.representative} · {party.position}</Text>
              <Text style={styles.label}>Notice email</Text><Text style={styles.value}>{party.noticeEmail}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.heading}>Commercial summary</Text>
        <View style={styles.agreed}>{snapshot.agreedCommercialTerms.map((term) => <Text key={term} style={styles.agreedLine}>•  {term}</Text>)}</View>
      </PdfPage>

      {clauseGroups.map((clauses, groupIndex) => {
        const pageNumber = groupIndex + 2;
        return (
          <PdfPage key={`clauses-${pageNumber}`} snapshot={snapshot}>
            {clauses.map((clause) => <ClauseView key={clause.id} clause={clause} />)}
            {groupIndex === clauseGroups.length - 1 && <Signatures snapshot={snapshot} execution={execution} />}
          </PdfPage>
        );
      })}
    </Document>
  );
}
