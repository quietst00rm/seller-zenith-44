import { useState } from 'react';
import { FiFileText, FiUpload, FiCheckCircle, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface EvidenceRequirement {
  type: string;
  description: string;
  required: boolean;
  examples: string[];
}

interface ProductType {
  id: string;
  name: string;
  violations: string[];
}

interface ViolationType {
  id: string;
  name: string;
  evidence: EvidenceRequirement[];
}

const productTypes: ProductType[] = [
  {
    id: 'electronics',
    name: 'Electronics & Accessories',
    violations: ['safety', 'listing-quality', 'authenticity', 'restricted-products']
  },
  {
    id: 'food',
    name: 'Food & Beverages',
    violations: ['labeling', 'safety', 'expiration', 'listing-quality']
  },
  {
    id: 'cosmetics',
    name: 'Beauty & Personal Care',
    violations: ['ingredients', 'claims', 'labeling', 'safety']
  },
  {
    id: 'toys',
    name: 'Toys & Games',
    violations: ['safety', 'age-requirements', 'choking-hazards', 'authenticity']
  },
  {
    id: 'apparel',
    name: 'Clothing & Accessories',
    violations: ['materials', 'size-charts', 'authenticity', 'listing-quality']
  }
];

const violationTypes: ViolationType[] = [
  {
    id: 'safety',
    name: 'Product Safety Violation',
    evidence: [
      {
        type: 'Safety Test Reports',
        description: 'Third-party lab reports showing product meets safety standards',
        required: true,
        examples: ['CPSC test report', 'UL certification', 'CE marking documentation']
      },
      {
        type: 'Supplier Invoices',
        description: 'Purchase documentation from authorized suppliers',
        required: true,
        examples: ['Commercial invoice', 'Purchase order', 'Bill of lading']
      },
      {
        type: 'Certificates of Analysis (COA)',
        description: 'Chemical composition and safety analysis',
        required: true,
        examples: ['Material safety data sheet (SDS)', 'Chemical analysis report']
      },
      {
        type: 'Product Photos',
        description: 'Clear images showing safety labels and markings',
        required: false,
        examples: ['Warning labels', 'Safety markings', 'Age recommendations']
      }
    ]
  },
  {
    id: 'authenticity',
    name: 'Authenticity/Counterfeit',
    evidence: [
      {
        type: 'Brand Authorization',
        description: 'Letter from brand owner authorizing you to sell',
        required: true,
        examples: ['Authorization letter', 'Distribution agreement', 'Reseller certificate']
      },
      {
        type: 'Purchase Invoices',
        description: 'Documentation showing purchase from authorized source',
        required: true,
        examples: ['Supplier invoice', 'Distributor receipt', 'Wholesale purchase order']
      },
      {
        type: 'Product Authenticity Photos',
        description: 'Detailed photos showing authentic product features',
        required: true,
        examples: ['Serial numbers', 'Holographic stickers', 'Brand markings']
      },
      {
        type: 'Supply Chain Documentation',
        description: 'Complete trail from manufacturer to you',
        required: false,
        examples: ['Import documentation', 'Distributor chain records']
      }
    ]
  },
  {
    id: 'listing-quality',
    name: 'Listing Quality Issues',
    evidence: [
      {
        type: 'Updated Listing Screenshots',
        description: 'Show corrected product information and images',
        required: true,
        examples: ['Fixed title', 'Accurate descriptions', 'Compliant images']
      },
      {
        type: 'Product Specifications',
        description: 'Accurate technical details and measurements',
        required: true,
        examples: ['Dimension charts', 'Weight specifications', 'Material composition']
      },
      {
        type: 'Image Compliance Documentation',
        description: 'Proof that images meet Amazon guidelines',
        required: false,
        examples: ['Image format compliance', 'Resolution verification']
      }
    ]
  }
];

export function EvidenceWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedViolation, setSelectedViolation] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const getAvailableViolations = () => {
    const product = productTypes.find(p => p.id === selectedProduct);
    return product ? product.violations : [];
  };

  const getCurrentEvidence = () => {
    const violation = violationTypes.find(v => v.id === selectedViolation);
    return violation ? violation.evidence : [];
  };

  const handleFileUpload = (evidenceType: string) => {
    // Simulate file upload
    setUploadedFiles(prev => [...prev, evidenceType]);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const requiredEvidence = getCurrentEvidence().filter(e => e.required);
  const uploadedRequiredEvidence = requiredEvidence.filter(e => uploadedFiles.includes(e.type));
  const isComplete = uploadedRequiredEvidence.length === requiredEvidence.length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">Evidence Readiness Wizard</CardTitle>
          <p className="text-muted-foreground">
            Get a personalized checklist of required evidence based on your product and violation type
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Product Selection */}
      {currentStep === 1 && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Step 1: Select Your Product Category</CardTitle>
            <p className="text-muted-foreground">
              Choose the category that best describes your product
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Select product category..." />
              </SelectTrigger>
              <SelectContent>
                {productTypes.map(product => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex justify-end">
              <Button 
                onClick={nextStep} 
                disabled={!selectedProduct}
                className="bg-gradient-primary hover:opacity-90"
              >
                Next Step
                <FiArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Violation Selection */}
      {currentStep === 2 && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Step 2: Select Violation Type</CardTitle>
            <p className="text-muted-foreground">
              What type of policy violation are you addressing?
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getAvailableViolations().map(violationId => {
                const violation = violationTypes.find(v => v.id === violationId);
                if (!violation) return null;

                return (
                  <Card
                    key={violation.id}
                    className={`cursor-pointer transition-all ${
                      selectedViolation === violation.id
                        ? 'ring-2 ring-primary bg-primary/5'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedViolation(violation.id)}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-medium">{violation.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {violation.evidence.length} evidence types required
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <FiArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button 
                onClick={nextStep} 
                disabled={!selectedViolation}
                className="bg-gradient-primary hover:opacity-90"
              >
                Next Step
                <FiArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Evidence Upload */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Step 3: Upload Required Evidence</CardTitle>
              <p className="text-muted-foreground">
                Upload the documents needed for your {violationTypes.find(v => v.id === selectedViolation)?.name}
              </p>
            </CardHeader>
          </Card>

          {getCurrentEvidence().map(evidence => (
            <Card key={evidence.type} className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      uploadedFiles.includes(evidence.type)
                        ? 'bg-success text-success-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {uploadedFiles.includes(evidence.type) ? (
                        <FiCheckCircle className="h-5 w-5" />
                      ) : (
                        <FiFileText className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{evidence.type}</CardTitle>
                      {evidence.required && (
                        <Badge variant="outline" className="mt-1 text-xs bg-destructive/10 text-destructive border-destructive/20">
                          Required
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{evidence.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Examples:</h4>
                  <div className="flex flex-wrap gap-2">
                    {evidence.examples.map(example => (
                      <Badge key={example} variant="outline" className="text-xs">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  variant={uploadedFiles.includes(evidence.type) ? "outline" : "default"}
                  onClick={() => handleFileUpload(evidence.type)}
                  disabled={uploadedFiles.includes(evidence.type)}
                >
                  {uploadedFiles.includes(evidence.type) ? (
                    <>
                      <FiCheckCircle className="mr-2 h-4 w-4" />
                      Uploaded
                    </>
                  ) : (
                    <>
                      <FiUpload className="mr-2 h-4 w-4" />
                      Upload File
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}

          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Evidence Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    {uploadedRequiredEvidence.length}/{requiredEvidence.length} required documents uploaded
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={prevStep}>
                    <FiArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button 
                    className="bg-gradient-primary hover:opacity-90"
                    disabled={!isComplete}
                  >
                    {isComplete ? 'Complete' : 'Upload Required Files'}
                  </Button>
                </div>
              </div>
              
              {isComplete && (
                <div className="mt-4 p-4 bg-success/5 border border-success/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FiCheckCircle className="h-5 w-5 text-success" />
                    <span className="font-medium text-success">All required evidence uploaded!</span>
                  </div>
                  <p className="text-sm text-success/80 mt-1">
                    You now have all the necessary documentation to submit your appeal.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}