import re


class PromptInjectionException(Exception):
    """Exception levée en cas de tentative d'injection de prompt."""

    pass


class PromptSanitizer:
    """Classe responsable de la détection et neutralisation des injections de prompts."""

    def __init__(self):
        # Détecte toute fermeture de balise structurelle critique
        self.malicious_patterns = [
            re.compile(r"</\s*(?:data|text|course|source|context|prompt|xml)\s*>", re.IGNORECASE),
            re.compile(r"<\s*system_override\s*>", re.IGNORECASE),
        ]

    def sanitize(self, raw_text: str) -> str:
        if not raw_text:
            return ""

        # 1. Validation Fail-Fast
        for pattern in self.malicious_patterns:
            if pattern.search(raw_text):
                raise PromptInjectionException(
                    "Tentative d'évasion de balise XML ou injection système détectée."
                )

        # 2. Neutralisation (Échappement des chevrons)
        sanitized_text = raw_text.replace("<", "&lt;").replace(">", "&gt;")
        return sanitized_text
