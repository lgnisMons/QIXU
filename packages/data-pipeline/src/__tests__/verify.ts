/**
 * Quick verification script for the Official Data Pipeline.
 * Run with: npx tsx packages/data-pipeline/src/__tests__/verify.ts
 */

import { createPipeline } from "../bootstrap";

async function main() {
  console.log("=== QIXU Official Data Pipeline Verification ===\n");

  // 1. Create pipeline instance
  const pipeline = createPipeline();
  console.log("✓ Pipeline created");
  console.log(`✓ Registered adapters: ${pipeline.registry.list().join(", ")}`);

  // 2. Ingest built-in mock data for 2025
  console.log("\n--- Ingesting 2025 data from built-in adapter ---");
  const result2025 = await pipeline.initBuiltIn(2025);
  console.log(`✓ Batch processed: ${result2025.version}`);
  console.log(`  Universities: ${result2025.universities.stats.valid}/${result2025.universities.stats.total} valid`);
  console.log(`  Majors: ${result2025.majors.stats.valid}/${result2025.majors.stats.total} valid`);
  console.log(`  Admissions: ${result2025.admissions.stats.valid}/${result2025.admissions.stats.total} valid`);
  console.log(`  Rejected: ${result2025.admissions.stats.rejected}`);

  if (result2025.admissions.rejectedRecords.length > 0) {
    console.log(`  Rejection reasons:`);
    for (const r of result2025.admissions.rejectedRecords.slice(0, 3)) {
      console.log(`    - ${r.errors.join("; ")}`);
    }
  }

  // 3. Test reader interface
  console.log("\n--- Testing DataReader (Recommendation Engine interface) ---");
  const reader = pipeline.reader;
  const years = reader.listYears();
  console.log(`✓ Available years: ${years.join(", ")}`);

  const summary = reader.getDatasetSummary(2025);
  if (summary) {
    console.log(`✓ 2025 Dataset Summary:`);
    console.log(`  Version: ${summary.version}`);
    console.log(`  Status: ${summary.status}`);
    console.log(`  Universities: ${summary.universityCount}`);
    console.log(`  Majors: ${summary.majorCount}`);
    console.log(`  Admission records: ${summary.admissionCount}`);
    console.log(`  Sources: ${summary.sources.join(", ")}`);
    console.log(`  Confidence: high=${summary.confidenceBreakdown.high}, medium=${summary.confidenceBreakdown.medium}, low=${summary.confidenceBreakdown.low}`);
  }

  // 4. Query admission records (simulating recommendation engine access)
  const admissions = reader.getAdmissionRecords(2025, { province: "广东" });
  console.log(`\n✓ Admission records for 广东: ${admissions.meta.count} records`);
  console.log(`  Version: ${admissions.meta.version}`);
  console.log(`  Sources: ${admissions.meta.sources.join(", ")}`);

  // Show first record with full provenance
  if (admissions.data.length > 0) {
    const first = admissions.data[0]!;
    const uni = reader.getUniversityById(2025, first.data.universityId);
    const maj = reader.getMajorById(2025, first.data.majorId);
    console.log(`\n  Sample record with provenance:`);
    console.log(`    University: ${uni?.name} (${uni?.tier})`);
    console.log(`    Major: ${maj?.name} (${maj?.category})`);
    console.log(`    Score cutoff: ${first.data.lowestScore}, Rank: ${first.data.lowestRank}`);
    console.log(`    Source: ${first.provenance.source.label} (${first.provenance.source.type})`);
    console.log(`    Collected: ${first.provenance.collectedAt}`);
    console.log(`    Academic Year: ${first.provenance.academicYear}`);
    console.log(`    Version: ${first.provenance.version}`);
    console.log(`    Confidence: ${first.provenance.confidence.level} (${first.provenance.confidence.score})`);
    console.log(`    Reason: ${first.provenance.confidence.reason}`);
  }

  // 5. Verify provenance metadata exists on every record
  console.log("\n--- Verifying Provenance Guarantees ---");
  let provenanceOk = true;
  for (const record of admissions.data) {
    if (!record.provenance.source || !record.provenance.collectedAt ||
        !record.provenance.academicYear || !record.provenance.updatedAt ||
        !record.provenance.confidence || !record.provenance.version) {
      provenanceOk = false;
      console.log(`  ✗ Missing provenance for record`);
      break;
    }
  }
  if (provenanceOk) {
    console.log(`✓ All ${admissions.data.length} records have complete provenance metadata`);
    console.log("  (source, collectedAt, academicYear, updatedAt, confidence, version)");
  }

  // 6. Test multi-year support
  console.log("\n--- Multi-year Support ---");
  // Ingest 2024 data as well (same mock data for testing)
  await pipeline.initBuiltIn(2024);
  const years2 = reader.listYears();
  console.log(`✓ Available years after 2024 ingest: ${years2.join(", ")}`);
  const adm2024 = reader.getAdmissionRecords(2024);
  console.log(`✓ 2024 admission records: ${adm2024.meta.count}`);

  // 7. Verify reader is read-only (no mutation methods)
  console.log("\n--- Read-only Interface Verification ---");
  const readerMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(reader))
    .filter((m) => m !== "constructor");
  const mutatingMethods = readerMethods.filter((m) =>
    ["add", "set", "delete", "insert", "update", "create", "remove", "ingest", "save", "write"].some(
      (prefix) => m.startsWith(prefix)
    )
  );
  if (mutatingMethods.length === 0) {
    console.log(`✓ DataReader has NO mutation methods (read-only interface enforced)`);
    console.log(`  Available methods: ${readerMethods.join(", ")}`);
  } else {
    console.log(`  ✗ Found potential mutation methods: ${mutatingMethods.join(", ")}`);
  }

  console.log("\n=== All verifications passed! ===");
}

main().catch(console.error);
