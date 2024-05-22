var os = require("os");
if (os.platform() == "win32") {
  if (os.arch() == "ia32") {
    var chilkat = require("@chilkat/ck-node11-win-ia32");
  } else {
    var chilkat = require("@chilkat/ck-node16-win64");
  }
} else if (os.platform() == "linux") {
  if (os.arch() == "arm") {
    var chilkat = require("@chilkat/ck-node11-arm");
  } else if (os.arch() == "x86") {
    var chilkat = require("@chilkat/ck-node11-linux32");
  } else {
    var chilkat = require("@chilkat/ck-node11-linux64");
  }
} else if (os.platform() == "darwin") {
  var chilkat = require("@chilkat/ck-node11-macosx");
}

function chilkatExample() {
  // This example requires the Chilkat API to have been previously unlocked.
  // See Global Unlock Sample for sample code.

  var pdf = new chilkat.Pdf();

  // Load a PDF that has cryptographic signatures to be validated
  var success = pdf.LoadFile(`${__dirname}/Domicile.pdf`);
  if (success == false) {
    console.log(pdf.LastErrorText);
    return;
  }

  // Each time we verify a signature, information about the signature is written into
  // sigInfo (replacing whatever sigInfo previously contained).
  var sigInfo = new chilkat.JsonObject();
  sigInfo.EmitCompact = false;

  // Iterate over each signature and validate each.
  var numSignatures = pdf.NumSignatures;
  var validated = false;
  var i = 0;
  while (i < numSignatures) {
    validated = pdf.VerifySignature(i, sigInfo);
    console.log("Signature " + i + " validated: " + validated);
    console.log(sigInfo.Emit());
    i = i + 1;
  }

  console.log("Finished.");

  // var json = new chilkat.JsonObject();

  // // Imagine that the "json" object contains the information obtained by validating a signature...
  // // The code below was generated using the online tool:  Generate Parsing Code from JSON

  // var unauthAttrTimestampTokenTstInfoGenTime = new chilkat.DtObj();
  // var signingTime = new chilkat.DtObj();
  // var authAttrSigningTimeUtctime = new chilkat.DtObj();
  // var intVal;
  // var strVal;
  // var issuerCN;
  // var serial;
  // var certSerialNumber;
  // var certIssuerCN;
  // var certDigestAlgOid;
  // var certDigestAlgName;
  // var contentType;
  // var messageDigest;
  // var signingAlgOid;
  // var signingAlgName;
  // var authAttr1_2_840_113583_1_1_8Der;
  // var authAttrContentTypeName;
  // var authAttrContentTypeOid;
  // var authAttrMessageDigestName;
  // var authAttrMessageDigestDigest;
  // var unauthAttrTimestampTokenName;
  // var unauthAttrTimestampTokenDer;
  // var unauthAttrTimestampTokenTimestampSignatureVerified;
  // var unauthAttrTimestampTokenTstInfoTsaPolicyId;
  // var unauthAttrTimestampTokenTstInfoMessageImprintHashAlg;
  // var unauthAttrTimestampTokenTstInfoMessageImprintDigest;
  // var unauthAttrTimestampTokenTstInfoMessageImprintDigestMatches;
  // var unauthAttrTimestampTokenTstInfoSerialNumber;
  // var j;
  // var count_j;
  // var authAttrSigningTimeName;
  // var authAttrSigningCertificateName;
  // var authAttrSigningCertificateDer;

  // validated = json.BoolOf("validated");
  // var signatureDictionary_Contents = json.StringOf(
  //   "signatureDictionary./Contents"
  // );
  // var signatureDictionary_Filter = json.StringOf("signatureDictionary./Filter");
  // var signatureDictionary_M = json.StringOf("signatureDictionary./M");
  // var signatureDictionary_Name = json.StringOf("signatureDictionary./Name");
  // var signatureDictionary_Prop_Build_App_Name = json.StringOf(
  //   "signatureDictionary./Prop_Build./App./Name"
  // );
  // var signatureDictionary_Prop_Build_App_R = json.IntOf(
  //   "signatureDictionary./Prop_Build./App./R"
  // );
  // var signatureDictionary_Prop_Build_App_REx = json.StringOf(
  //   "signatureDictionary./Prop_Build./App./REx"
  // );
  // var signatureDictionary_Prop_Build_App_TrustedMode = json.BoolOf(
  //   "signatureDictionary./Prop_Build./App./TrustedMode"
  // );
  // var signatureDictionary_Prop_Build_Filter_Date = json.StringOf(
  //   "signatureDictionary./Prop_Build./Filter./Date"
  // );
  // var signatureDictionary_Prop_Build_Filter_Name = json.StringOf(
  //   "signatureDictionary./Prop_Build./Filter./Name"
  // );
  // var signatureDictionary_Prop_Build_Filter_R = json.IntOf(
  //   "signatureDictionary./Prop_Build./Filter./R"
  // );
  // var signatureDictionary_Prop_Build_Filter_V = json.IntOf(
  //   "signatureDictionary./Prop_Build./Filter./V"
  // );
  // var signatureDictionary_Prop_Build_PubSec_Date = json.StringOf(
  //   "signatureDictionary./Prop_Build./PubSec./Date"
  // );
  // var signatureDictionary_Prop_Build_PubSec_NonEFontNoWarn = json.BoolOf(
  //   "signatureDictionary./Prop_Build./PubSec./NonEFontNoWarn"
  // );
  // var signatureDictionary_Prop_Build_PubSec_R = json.IntOf(
  //   "signatureDictionary./Prop_Build./PubSec./R"
  // );
  // var signatureDictionary_SubFilter = json.StringOf(
  //   "signatureDictionary./SubFilter"
  // );
  // var signatureDictionary_Type = json.StringOf("signatureDictionary./Type");
  // i = 0;
  // var count_i = json.SizeOfArray("signatureDictionary./ByteRange");
  // while (i < count_i) {
  //   json.I = i;
  //   intVal = json.IntOf("signatureDictionary./ByteRange[i]");
  //   i = i + 1;
  // }

  // i = 0;
  // count_i = json.SizeOfArray("signatureDictionary./Prop_Build./App./OS");
  // while (i < count_i) {
  //   json.I = i;
  //   strVal = json.StringOf("signatureDictionary./Prop_Build./App./OS[i]");
  //   i = i + 1;
  // }

  // i = 0;
  // count_i = json.SizeOfArray("pkcs7.verify.certs");
  // while (i < count_i) {
  //   json.I = i;
  //   issuerCN = json.StringOf("pkcs7.verify.certs[i].issuerCN");
  //   serial = json.StringOf("pkcs7.verify.certs[i].serial");
  //   i = i + 1;
  // }

  // i = 0;
  // count_i = json.SizeOfArray("pkcs7.verify.digestAlgorithms");
  // while (i < count_i) {
  //   json.I = i;
  //   strVal = json.StringOf("pkcs7.verify.digestAlgorithms[i]");
  //   i = i + 1;
  // }

  // i = 0;
  // count_i = json.SizeOfArray("pkcs7.verify.signerInfo");
  // while (i < count_i) {
  //   json.I = i;
  //   certSerialNumber = json.StringOf(
  //     "pkcs7.verify.signerInfo[i].cert.serialNumber"
  //   );
  //   certIssuerCN = json.StringOf("pkcs7.verify.signerInfo[i].cert.issuerCN");
  //   certDigestAlgOid = json.StringOf(
  //     "pkcs7.verify.signerInfo[i].cert.digestAlgOid"
  //   );
  //   certDigestAlgName = json.StringOf(
  //     "pkcs7.verify.signerInfo[i].cert.digestAlgName"
  //   );
  //   contentType = json.StringOf("pkcs7.verify.signerInfo[i].contentType");
  //   messageDigest = json.StringOf("pkcs7.verify.signerInfo[i].messageDigest");
  //   signingAlgOid = json.StringOf("pkcs7.verify.signerInfo[i].signingAlgOid");
  //   signingAlgName = json.StringOf("pkcs7.verify.signerInfo[i].signingAlgName");
  //   authAttr1_2_840_113583_1_1_8Der = json.StringOf(
  //     'pkcs7.verify.signerInfo[i].authAttr."1.2.840.113583.1.1.8".der'
  //   );
  //   authAttrContentTypeName = json.StringOf(
  //     'pkcs7.verify.signerInfo[i].authAttr."1.2.840.113549.1.9.3".name'
  //   );
  //   authAttrContentTypeOid = json.StringOf(
  //     'pkcs7.verify.signerInfo[i].authAttr."1.2.840.113549.1.9.3".oid'
  //   );
  //   authAttrMessageDigestName = json.StringOf(
  //     'pkcs7.verify.signerInfo[i].authAttr."1.2.840.113549.1.9.4".name'
  //   );
  //   authAttrMessageDigestDigest = json.StringOf(
  //     'pkcs7.verify.signerInfo[i].authAttr."1.2.840.113549.1.9.4".digest'
  //   );
  //   unauthAttrTimestampTokenName = json.StringOf(
  //     'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".name'
  //   );
  //   unauthAttrTimestampTokenDer = json.StringOf(
  //     'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".der'
  //   );
  //   unauthAttrTimestampTokenTimestampSignatureVerified = json.BoolOf(
  //     'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".timestampSignatureVerified'
  //   );
  //   unauthAttrTimestampTokenTstInfoTsaPolicyId = json.StringOf(
  //     'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".tstInfo.tsaPolicyId'
  //   );
  //   unauthAttrTimestampTokenTstInfoMessageImprintHashAlg = json.StringOf(
  //     'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".tstInfo.messageImprint.hashAlg'
  //   );
  //   unauthAttrTimestampTokenTstInfoMessageImprintDigest = json.StringOf(
  //     'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".tstInfo.messageImprint.digest'
  //   );
  //   unauthAttrTimestampTokenTstInfoMessageImprintDigestMatches = json.BoolOf(
  //     'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".tstInfo.messageImprint.digestMatches'
  //   );
  //   unauthAttrTimestampTokenTstInfoSerialNumber = json.StringOf(
  //     'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".tstInfo.serialNumber'
  //   );
  //   json.DtOf(
  //     'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".tstInfo.genTime',
  //     false,
  //     unauthAttrTimestampTokenTstInfoGenTime
  //   );
  //   j = 0;
  //   count_j = json.SizeOfArray(
  //     'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".verify.digestAlgorithms'
  //   );
  //   while (j < count_j) {
  //     json.J = j;
  //     strVal = json.StringOf(
  //       'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".verify.digestAlgorithms[j]'
  //     );
  //     j = j + 1;
  //   }

  //   j = 0;
  //   count_j = json.SizeOfArray(
  //     'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".verify.signerInfo'
  //   );
  //   while (j < count_j) {
  //     json.J = j;
  //     certSerialNumber = json.StringOf(
  //       'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".verify.signerInfo[j].cert.serialNumber'
  //     );
  //     certIssuerCN = json.StringOf(
  //       'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".verify.signerInfo[j].cert.issuerCN'
  //     );
  //     certDigestAlgOid = json.StringOf(
  //       'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".verify.signerInfo[j].cert.digestAlgOid'
  //     );
  //     certDigestAlgName = json.StringOf(
  //       'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".verify.signerInfo[j].cert.digestAlgName'
  //     );
  //     contentType = json.StringOf(
  //       'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".verify.signerInfo[j].contentType'
  //     );
  //     json.DtOf(
  //       'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".verify.signerInfo[j].signingTime',
  //       false,
  //       signingTime
  //     );
  //     messageDigest = json.StringOf(
  //       'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".verify.signerInfo[j].messageDigest'
  //     );
  //     signingAlgOid = json.StringOf(
  //       'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".verify.signerInfo[j].signingAlgOid'
  //     );
  //     signingAlgName = json.StringOf(
  //       'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".verify.signerInfo[j].signingAlgName'
  //     );
  //     authAttrContentTypeName = json.StringOf(
  //       'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".verify.signerInfo[j].authAttr."1.2.840.113549.1.9.3".name'
  //     );
  //     authAttrContentTypeOid = json.StringOf(
  //       'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".verify.signerInfo[j].authAttr."1.2.840.113549.1.9.3".oid'
  //     );
  //     authAttrSigningTimeName = json.StringOf(
  //       'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".verify.signerInfo[j].authAttr."1.2.840.113549.1.9.5".name'
  //     );
  //     json.DtOf(
  //       'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".verify.signerInfo[j].authAttr."1.2.840.113549.1.9.5".utctime',
  //       false,
  //       authAttrSigningTimeUtctime
  //     );
  //     authAttrSigningCertificateName = json.StringOf(
  //       'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".verify.signerInfo[j].authAttr."1.2.840.113549.1.9.16.2.12".name'
  //     );
  //     authAttrSigningCertificateDer = json.StringOf(
  //       'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".verify.signerInfo[j].authAttr."1.2.840.113549.1.9.16.2.12".der'
  //     );
  //     authAttrMessageDigestName = json.StringOf(
  //       'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".verify.signerInfo[j].authAttr."1.2.840.113549.1.9.4".name'
  //     );
  //     authAttrMessageDigestDigest = json.StringOf(
  //       'pkcs7.verify.signerInfo[i].unauthAttr."1.2.840.113549.1.9.16.2.14".verify.signerInfo[j].authAttr."1.2.840.113549.1.9.4".digest'
  //     );
  //     j = j + 1;
  //   }

  //   i = i + 1;
  // }

  // i = 0;
  // count_i = json.SizeOfArray("pkcs7.verify.pkcs7.verify.certs");
  // while (i < count_i) {
  //   json.I = i;
  //   issuerCN = json.StringOf("pkcs7.verify.pkcs7.verify.certs[i].issuerCN");
  //   serial = json.StringOf("pkcs7.verify.pkcs7.verify.certs[i].serial");
  //   i = i + 1;
  // }
}

chilkatExample();
